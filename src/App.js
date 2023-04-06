import React from "react";
import Router from "./Shared/Router";
import { RecoilRoot } from "recoil";
const App = () => {
  // if (1 === 1) {
  //   console.log = function no_console() {};
  //   console.warn = function no_console() {};
  // }
  console.log("눌러봥");
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};
//

export default App;
