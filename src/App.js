import React, { useEffect } from 'react';
import Router from './Shared/Router';
import { RecoilRoot } from 'recoil';
import { hotjar } from 'react-hotjar';
const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      hotjar.initialize(3528659, 6);
    }
  }, []);

  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};
//

export default App;
