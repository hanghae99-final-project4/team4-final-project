import { atom } from 'recoil';

const USER_KEY = 'user';
const PRIMARY_KEY = 'primary';
const AGREE_KEY = 'agree';
const NAME_KEY = 'nickname';
const STATION_KEY = 'station';
const ARRIVE_KEY = 'arrive';
const HISTORY_KEY = 'history';
const SEARCH_KEY = 'search';
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
      age: '',
      gender: '',
      nickname: '',
    },
  ],
});
const useStationState = atom({
  key: STATION_KEY,
  default: [],
});
const useSearchState = atom({
  key: SEARCH_KEY,
  default: [],
});
const useHistoryState = atom({
  key: HISTORY_KEY,
  default: [],
});
const useArriveState = atom({
  key: ARRIVE_KEY,
  default: [],
});
export {
  useInfoState,
  usePrimaryState,
  useAgreeState,
  useUserState,
  useStationState,
  useSearchState,
  useHistoryState,
  useArriveState,
};
