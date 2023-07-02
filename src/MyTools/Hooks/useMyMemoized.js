import { useRecoilState } from 'recoil';
import { useAlarmState, useCursorState } from '../../Recoil/userList';
import { useCallback } from 'react';
import { trainApi } from '../../apis/Instance';

export const useMymemoizedAlarm = () => {
  const [alarm, setAlarm] = useRecoilState(useAlarmState);
  const [next, setNext] = useRecoilState(useCursorState);
  const fetchAlarm = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    const { data } = await trainApi.getalarm(userId);

    setNext(data.nextcursor);
    setAlarm(data.result);
  }, [setAlarm]);

  return fetchAlarm;
};
