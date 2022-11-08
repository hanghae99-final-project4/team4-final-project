import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  // headers: {
  //     Authorization: `${token}`,
  //   },
});

export const retroApi = {
  post: (payload) => instance.post("/users", payload),
  get: (payload) => instance.get("/users", payload),
  delete: (payload) => instance.delete("/users"),
};
