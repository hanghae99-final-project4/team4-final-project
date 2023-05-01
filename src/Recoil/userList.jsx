import { atom } from "recoil";

const USER_KEY = "user";
const PRIMARY_KEY = "primary";
const AGREE_KEY = "agree";
const NAME_KEY = "nickname";

const useInfoState = atom({
  key: USER_KEY,
  default: [],
});

const usePrimaryState = atom({
  key: PRIMARY_KEY,
  default: [],
});
const useAgreeState = atom({
  key: AGREE_KEY,
  default: [{ agreepi: false }],
});
const useUserState = atom({
  key: NAME_KEY,
  default: [
    {
      gender: "",
      nickname: "",
    },
  ],
});

export { useInfoState, usePrimaryState, useAgreeState, useUserState };
