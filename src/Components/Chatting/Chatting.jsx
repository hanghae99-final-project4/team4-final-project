import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useInput from "../../MyTools/Hooks/UseInput";
import { useState } from "react";
const socket = io("https://cheolsu.shop/");

const Chatting = () => {
  const [room, setRoom] = useState({});
  const [message, onChangeHandler, reset] = useInput({});
  const name = JSON.parse(localStorage.getItem("nickname")).value;
  console.log(name);
  console.log(room);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("randomjoin", {
      train: JSON.parse(localStorage.getItem("train")).value,
      nickname: JSON.parse(localStorage.getItem("nickname")).value,
      dropstation: JSON.parse(localStorage.getItem("dropstation")).value,
    });
    socket.on("maching", (message) => {
      console.log(message);
      setRoom(message.roomkey);
    });

    socket.on(`"${name}"`, (message) => {
      console.log(message, "재우임");
    });
  }, []);

  const sendHandler = () => {
    socket.emit("randomchat", {
      msg: message.msg,
      roomkey: room,
    });

    socket.on("broadcast", (message) => {
      console.log(message.msg);
    });
  };

  return (
    <div>
      Chatting
      <input value={message.msg} onChange={onChangeHandler} name="msg" />
      <button onClick={sendHandler}>제출</button>
    </div>
  );
};

export default Chatting;
