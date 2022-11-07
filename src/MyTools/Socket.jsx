import { io } from "socket.io-client";
export const socket = io("http://52.79.195.173", {
  transports: ["websocket"],
});
export const initSocketConnection = () => {
  if (socket) return;
  socket.connect();
};

//이벤트 명을 지정하고 데이터 보냄.
export const sendSocketMessage = (cmd, body = null) => {
  if (socket == null || socket.conneted === false) {
    initSocketConnection();
  }
  //emit server 측에다 전달
  socket.emit("message", {
    cmd: cmd,
    body: body,
  });
};
