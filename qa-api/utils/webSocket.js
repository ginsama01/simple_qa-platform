const clients = new Set();

const processSocket = (socket) => {
  clients.add(socket);
  socket.onopen = () => {
    console.log("Client connected");
  };

  socket.onclose = () => {
    console.log("Client disconnected");
    clients.delete(socket);
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
    clients.delete(socket);
  };

};

const sendPingUpdateQuestion = (message) => {
  for (const socket of clients) {
    socket.send(message);
  }

}

export { processSocket, sendPingUpdateQuestion };
