import React, { useEffect, useRef } from 'react';

const useIntersection = (callback, options) => {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [callback, options]);
  return target;
};

export default useIntersection;
