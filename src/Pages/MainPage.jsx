import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
const MainPage = () => {
  const [message, setMessage] = useState("");
  const messageSendHandler = () => {};
  // const GetChats = async () => {
  //   try {
  //     const { data } = await axios.post("https://cheolsu.shop", "hi");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {}, [GetChats()]);

  return (
    <div>
      <div className="text-center">여기는 메인</div>
      <input
        name={message}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => messageSendHandler()} className="text-center">
        버튼
      </button>
    </div>
  );
};

export default MainPage;
