const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, '');

      // Validation
      if (!fullname || !username || !email || !password) {
        return res
          .status(400)
          .json({ message: 'Please fill in all fields.' });
      }

      const user_name = await User.findOne({ username: newUserName });
      if (user_name) {
        return res
          .status(400)
          .json({ message: 'This username already exists.' });
      }

      const user_email = await User.findOne({ email });
      if (user_email) {
        return res
          .status(400)
          .json({ message: 'This email already exists.' });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: 'Password must be at least 6 characters.' });
      }

      // Password hash
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30 days
      });

      await newUser.save();

      res.json({
        message: 'Register Success!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existsUser = await User.findOne({ email }).populate(
        'followers following',
        'avatar username fullname followers following'
      );

      // Validate
      if (!existsUser) {
        return res.status(400).json({
          message: 'User with that email does not exist. Please signup.',
        });
      }

      const isMatch = await bcrypt.compare(password, existsUser.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Password is incorrect.',
        });
      }

      const access_token = createAccessToken({
        id: existsUser._id,
      });
      const refresh_token = createRefreshToken({
        id: existsUser._id,
      });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        message: 'Login Success.',
        access_token,
        user: {
          ...existsUser._doc,
          password: '',
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refresh_token', {
        path: '/api/refresh_token',
      });
      return res.json({
        message: 'Logged out.',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;
      if (!rf_token) {
        return res.status(400).json({
          message: 'Please login now.',
        });
      }

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, result) => {
          if (error) {
            return res.status(400).json({
              message: 'Please login now.',
            });
          }

          const existsUser = await User.findById(result.id)
            .select('-password')
            .populate(
              'followers following',
              'avatar username fullname followers following'
            );

          if (!existsUser) {
            return res.status(400).json({
              message: 'This does not exist.',
            });
          }

          const access_token = createAccessToken({
            id: result.id,
          });

          res.json({
            access_token,
            user: existsUser,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = authController;
