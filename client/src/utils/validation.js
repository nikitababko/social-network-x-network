const validation = ({
  fullname,
  username,
  email,
  password,
  cf_password,
  gender,
}) => {
  const error = {};

  if (!fullname) {
    error.fullname = 'Please add your full name.';
  } else if (fullname.length > 25) {
    error.fullname = 'Full name is up to 25 characters long.';
  }

  if (!username) {
    error.username = 'Please add your user name.';
  } else if (username.replace(/ /g, '').length > 25) {
    error.username = 'User name is up to 25 characters long.';
  }

  if (!email) {
    error.email = 'Please add your email.';
  } else if (!validateEmail(email)) {
    error.email = 'Email format is incorrect.';
  }

  if (!password) {
    error.password = 'Please add your password.';
  } else if (password.length < 6) {
    error.password = 'Password must be at least 6 characters.';
  }

  if (password !== cf_password) {
    error.cf_password = 'Confirm password did not match.';
  }

  return {
    errorMessage: error,
    errLength: Object.keys(error).length,
  };
};

function validateEmail(email) {
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default validation;
