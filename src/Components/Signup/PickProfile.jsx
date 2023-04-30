import React from "react";
import styled from "styled-components";
import camera from "../../Assets/SetProfile/camera.svg";
import { useRef } from "react";
const PickProfile = () => {
  const cameraref = useRef();
  const uploadHandler = () => {
    cameraref.current.click();
  };
  return (
    <Wrap>
      <SpanBox>
        <Select>사진선택</Select>
        <Maximum>최대 5장의 사진을 선택 해주세요.</Maximum>
      </SpanBox>
      <Camera onClick={uploadHandler} src={camera} alt="camera" />
      <Input ref={cameraref} type="file" />
    </Wrap>
  );
};

export default PickProfile;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Select = styled.span`
  width: 70px;
  height: 24px;
  font-weight: 600;
  font-size: 20px;
  color: #2d2d2d;
`;
const Maximum = styled.span`
  margin-left: -1px;
  font-family: Roboto;
  width: 208px;
  height: 16px;
  font-weight: 400;
  font-size: 14px;
  color: #535353;
`;
const SpanBox = styled.div`
  margin-left: 16px;
  margin-top: 30px;
  gap: 10px;
  width: 194px;
  height: 50px;
  display: flex;
  flex-direction: column;
`;
const Camera = styled.img`
  margin-top: 25px;
  width: 110px;
  height: 110px;
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;
