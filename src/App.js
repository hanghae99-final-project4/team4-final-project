import React from "react";
import Router from "./Shared/Router";

const App = () => {
  if (1 === 1) {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  console.log("눌러봥");
  return (
    <div>
      <Router />
    </div>
  );
};
//

export default App;
