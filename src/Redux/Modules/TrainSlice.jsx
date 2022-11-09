import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  nickname: "윤지",
  msg: "",
  gender: "여성",
  train: 7143,
  dropstation: "강남역",
  from: false,
};

export default TrainSlice;
