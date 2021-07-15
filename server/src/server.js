require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { PeerServer } = require('peer');

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
PeerServer({ port: 3001, path: '/' });

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

// Setup server
const PORT = process.env.PORT;
http.listen(PORT, (err) => {
  if (err) throw Error(err);
  console.log(`Server has started on port: ${PORT}`);
});
