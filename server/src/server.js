require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Setup app
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

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

// Setup server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) throw Error(err);
  console.log(`Server has started on port: ${PORT}`);
});
