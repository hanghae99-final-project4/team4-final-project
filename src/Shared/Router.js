import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../Pages/ChatPage";
import MainPage from "../Pages/MainPage";
import ConversPage from "../Pages/ConversPage";
import ChattingPage from "../Pages/ChattingPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/converspage" element={<ConversPage />} />
        <Route path="/chattingpage" element={<ChattingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
