import { atom } from "recoil";

const USER_KEY = "user";
const PRIMARY_KEY = "primary";
const AGREE_KEY = "agree";
const NAME_KEY = "nickname";
const STATION_KEY = "station";

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
      age: "",
      gender: "",
      nickname: "",
    },
  ],
});
const useStationState = atom({
  key: STATION_KEY,
  default: [],
});

export {
  useInfoState,
  usePrimaryState,
  useAgreeState,
  useUserState,
  useStationState,
};
