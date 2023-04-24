import React, { useCallback, useRef, useState } from "react";

import { memo } from "react";
import styled from "styled-components";

const Accordion = (props) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );
  const parentRefHeight = parentRef?.current?.style?.height ?? "0px";
  const buttonText = parentRefHeight === "0px" ? "보기" : "닫기";
  return (
    <Container>
      <Header onClick={handleButtonClick}>
        <Title>{props.title}</Title>
        <Button>{buttonText}</Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
};
export default memo(Accordion);

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  /* margin: 0 50px 0 8px; */
  color: #4d4d4d;
`;
const Title = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  align-items: center;
  font-weight: 400;
  position: absolute;
  left: -25px;
`;
const Button = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 29px;
  height: 17px;
  border-bottom: 1px solid #898989;
  color: #898989;
  top: 8px;
  right: 8px;
  font-size: 14px;
  align-items: center;
  position: absolute;
`;
const ContentsWrapper = styled.div`
  height: 0px;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  background-color: gray;
  color: white;
  transition: height 0.35s ease, background 0.35s ease;
  margin-top: ${(props) => (props.isCollapse ? "0" : "-10px")};
`;
const Contents = styled.div`
  padding: 0.1px;
`;
