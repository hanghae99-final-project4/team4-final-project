import { atom } from "recoil";

const USER_KEY = "user";

const useInfoState = atom({
  key: USER_KEY,
  default: [],
});

export { useInfoState };
