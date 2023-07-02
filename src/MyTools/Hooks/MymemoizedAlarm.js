import React, { useCallback, useEffect, useState } from 'react';
import { trainApi } from '../../apis/Instance';
import { useAlarmState } from '../../Recoil/userList';
import { useRecoilState } from 'recoil';
import { useMymemoizedAlarm } from './useMyMemoized';

const MymemoizedAlarm = () => {
  const fetch = useMymemoizedAlarm();
  useEffect(() => {
    fetch();
  }, []);
  return null;
};

export default MymemoizedAlarm;
