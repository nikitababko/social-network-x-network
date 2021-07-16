require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { ExpressPeerServer } = require('peer');

const SocketServer = require('./socketServer');

// Setup app
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  SocketServer(socket);
});

// Peer server
ExpressPeerServer(http, { path: '/' });

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// Setup DB
const URI = process.env.MONGODB_URI;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw Error(err);
    console.log(`Data base has started on port: ${URI}`);
  }
);

// Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Setup server
const PORT = process.env.PORT;
http.listen(PORT, (err) => {
  if (err) throw Error(err);
  console.log(`Server has started on port: ${PORT}`);
});
