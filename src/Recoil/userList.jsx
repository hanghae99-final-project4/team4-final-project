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
const useEmailState = atom({
  key: 'email',
  default: { email: '' },
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
  default: [],
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
//프로필 변경
const usePatchState = atom({
  key: 'patch',
  default: [],
});
const useBotState = atom({
  key: 'bot',
  default: false,
});
const useStartState = atom({
  key: 'start',
  default: [],
});
const useDetailState = atom({
  key: 'detail',
  default: [],
});
const useReportState = atom({
  key: 'reprot',
  default: 0,
});
const useContinueState = atom({
  key: 'continue',
  default: [],
});
const useAlarmState = atom({
  key: 'alarm',
  default: [],
});
const useCursorState = atom({
  key: 'cursor',
  default: '',
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
  useEmailState,
  usePatchState,
  useBotState,
  useStartState,
  useDetailState,
  useReportState,
  useContinueState,
  useAlarmState,
  useCursorState,
};
