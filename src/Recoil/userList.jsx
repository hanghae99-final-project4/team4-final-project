import { atom } from "recoil";

const USER_KEY = "user";
const PRIMARY_KEY = "primary";

const useInfoState = atom({
  key: USER_KEY,
  default: [],
});

const usePrimaryState = atom({
  key: PRIMARY_KEY,
  default: [],
});

export { useInfoState, usePrimaryState };
