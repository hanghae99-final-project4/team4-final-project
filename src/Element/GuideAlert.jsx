import React from "react";
import { ReactComponent as GuideAlertItem } from "../Assets/GuideIcon.svg";
import GuideExit from "./GuideExit";
import styled from "styled-components";
import ExitIcon from "./ExitIcon";
const GuideAlert = () => {
  return (
    <GuideAlertBox>
      <GuideAlertItem></GuideAlertItem>
    </GuideAlertBox>
  );
};

export default GuideAlert;
const GuideAlertBox = styled.div``;
