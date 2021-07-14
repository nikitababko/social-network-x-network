let users = [];

const SocketServer = (socket) => {
  // Connect
  socket.on('joinUser', (id) => {
    users.push({ id, socketId: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });

  // Likes
  socket.on('likePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost);
      });
    }
  });

  socket.on('unLikePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost);
      });
    }
  });

  // Comments
  socket.on('createComment', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit('createCommentToClient', newPost);
      });
    }
  });

  socket.on('deleteComment', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit('deleteCommentToClient', newPost);
      });
    }
  });

  // Follow
  socket.on('follow', (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit('followToClient', newUser);
  });

  socket.on('unFollow', (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user &&
      socket.to(`${user.socketId}`).emit('unFollowToClient', newUser);
  });

  // Notification
  socket.on('createNotify', (message) => {
    const client = users.find((user) =>
      message.recipients.includes(user.id)
    );
    client &&
      socket
        .to(`${client.socketId}`)
        .emit('createNotifyToClient', message);
  });

  socket.on('removeNotify', (message) => {
    const client = users.find((user) =>
      message.recipients.includes(user.id)
    );
    client &&
      socket
        .to(`${client.socketId}`)
        .emit('removeNotifyToClient', message);
  });

  // Message
  socket.on('addMessage', (message) => {
    const user = users.find((user) => user.id === message.recipient);
    user &&
      socket.to(`${user.socketId}`).emit('addMessageToClient', message);
  });
};

module.exports = SocketServer;
