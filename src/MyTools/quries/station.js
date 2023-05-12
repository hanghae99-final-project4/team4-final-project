import { useQuery } from 'react-query';
import { trainApi } from '../../apis/Instance';

const getStation = async (station) => {
  const { data } = await trainApi.getStation(station);
  return data;
};

export function useStation(station) {
  return useQuery(['keyword', station], () => getStation(station), {
    enabled: !!station,
  });
}
