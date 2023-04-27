import React from "react";
import styled from "styled-components";
import progress from "../../Assets/SetProfile/progress.svg";
import hello from "../../Assets/SetProfile/hello.gif";
import { useState } from "react";

const ProfileSet = () => {
  const [isClick, setIsClick] = useState("1");
  const [isChecked, setIsChecked] = useState(false);

  const genderClickHandler = (e) => {
    setIsChecked((prev) => !prev);
    setIsClick((prev) => {
      return e.target.value;
    });
  };

  const GenderList = [
    { value: "1", name: "여성", id: "girl" },
    { value: "2", name: "남성", id: "gender" },
  ];
  console.log(isClick);
  return (
    <Wrap>
      <GifBox>
        <ProgressImg src={progress} alt="progress" />
        <Hello src={hello} alt="hello" />
        <SpanBox>
          <Welcome>반갑습니다!</Welcome>
          <Gender>
            환승시민에서 사용하실
            <br />
            성별을 알려주세요
          </Gender>
        </SpanBox>
      </GifBox>
      <GenderBox>
        {GenderList.map((item, index) => (
          <GenderButton
            id={item.id}
            value={item.value}
            className={item.value === isClick ? "active" : ""}
            key={index}
            onClick={genderClickHandler}
          >
            <GenderSpan>{item.name}</GenderSpan>

            <Activeinput
              className={item.value === isClick ? "active" : ""}
              value={item.value}
              type="radio"
            />
          </GenderButton>
        ))}
      </GenderBox>
    </Wrap>
  );
};

export default ProfileSet;

const Wrap = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GifBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  height: 251px;
  margin-top: 100px;
`;
const ProgressImg = styled.img`
  width: 26px;
  height: 8px;
  margin-top: 10px;
`;
const SpanBox = styled.div`
  width: 134px;
  height: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Welcome = styled.span`
  width: 102px;
  height: 26px;
  font-size: 22px;
  font-weight: 500;
`;
const Hello = styled.img`
  width: 240px;
  height: 220px;
`;
const Gender = styled.span`
  width: 134px;
  height: 36px;
  font-size: 15px;
  font-weight: 400;
  margin-top: 20px;
  text-align: center;
`;
const GenderBox = styled.div`
  margin-top: 39px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  height: 140px;
  gap: 20px;
`;
const GenderButton = styled.button`
  position: relative;
  width: 300px;
  height: 60px;
  border: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    color: #ffffff;
    background-color: #fa3a45;
  }
`;
const Activeinput = styled.input`
  position: absolute;
  right: 20px;

  width: 20px;
  height: 20px;
  vertical-align: middle;
  appearance: none;
  background-color: #ffffff;
  border: max(2px, 0.1em) solid #cfcfcf;
  border-radius: 50%;

  &::before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    margin: 2px;
    background-color: #cfcfcf;
    border-radius: 50%;
  }
  &.active {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    appearance: none;
    background-color: #ffffff;
    border: max(2px, 0.1em) solid #ffffff;
    border-radius: 50%;

    &::before {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      margin: 2px;
      background-color: #fa3a45;
      border-radius: 50%;
    }
  }
`;

const GenderSpan = styled.span`
  margin-left: 20px;
`;
