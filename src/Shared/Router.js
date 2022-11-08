import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import SitdownPage from "../Pages/SitdownPage";
import StandPage from "../Pages/StandPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/sitdownpage" element={<SitdownPage />} />
        <Route path="/standpage" element={<StandPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
