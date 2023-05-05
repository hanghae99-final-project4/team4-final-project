import React from 'react';
import styled from 'styled-components';
import progress from '../../Assets/SetProfile/centerprogress.svg';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useUserState } from '../../Recoil/userList';
import nextbutton from '../../Assets/SetProfile/nextbutton.svg';
import beforebutton from '../../Assets/SetProfile/beforebutton.svg';
import { useNavigate } from 'react-router-dom';
const AgetSet = () => {
  const navigate = useNavigate();
  const [isAge, setIsAge] = useState('1');
  const [age, setAge] = useRecoilState(useUserState);
  const clickHandler = (e) => {
    setAge({ ...age, age: e.target.name });
    console.log(e.target.name);
    setIsAge((prev) => {
      return e.target.value;
    });
  };
  console.log(age);
  const ageList = [
    { value: '1', name: '10대', id: '10' },
    { value: '2', name: '20대', id: '20' },
    { value: '3', name: '30대', id: '30' },
    { value: '4', name: '40대', id: '40' },
    { value: '5', name: '50대', id: '50' },
    { value: '6', name: '기타', id: '기타' },
  ];
  const beforeHandler = () => {
    navigate(-1);
  };
  const nextHandler = () => {
    navigate('/setprofile');
  };

  return (
    <Wrap>
      <Box>
        <img src={progress} alt="progress" />
        <span>본인의 연령대를 선택해주세요 :)</span>
      </Box>
      <AgeBox>
        {ageList.map((item, index) => (
          <Age
            className={item.value === isAge ? 'main' : ''}
            onClick={clickHandler}
            key={index}
            value={item.value}
            id={item.id}
            name={item.name}
          >
            {item.name}
          </Age>
        ))}
      </AgeBox>
      <ButtonBox>
        <div onClick={beforeHandler}>
          <img src={beforebutton} alt="before" />
          <span>이전</span>
        </div>
        <div onClick={nextHandler}>
          <img src={nextbutton} alt="next" />
          <span>다음</span>
        </div>
      </ButtonBox>
    </Wrap>
  );
};

export default AgetSet;

const Wrap = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  margin-top: 92px;
  width: 219px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 50px;
  }
`;
const AgeBox = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 170px;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
const Age = styled.button`
  border: 1px solid #cdcdcd;
  color: #939393;
  border-radius: 4px;
  width: 84px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.main {
    color: #fa3a45;
    border: 1px solid #fa3a45;
  }
`;
const ButtonBox = styled.div`
  margin-top: 203px;
  width: 343px;
  height: 67px;
  display: flex;
  justify-content: space-between;
  div {
    width: 40px;
    height: 67px;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    img {
      cursor: pointer;
    }
  }
`;
