import React from 'react';
import { trainApi } from '../../apis/Instance';
import { useInfiniteQuery } from 'react-query';

const useInfinite = () => {
  const getMatch = async ({ cursor }) => {
    const response = await trainApi.getInfinite(cursor);
    const { nextcursor, result } = response.data;
    return {
      result: result,
      nextcursor: nextcursor,
    };
  };

  const query = useInfiniteQuery(['matching_history'], getMatch, {
    getNextPage: (nextcursor) => {
      if (!nextcursor) return nextcursor;
      return undefined;
    },
    select: null,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });
  return query;
};

export default useInfinite;
