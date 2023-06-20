import React from 'react';
import { ModalCtn } from './CounterProfileModal';
import styled from 'styled-components';

const ChattingModal = ({ children }) => {
  return (
    <ModalCtn>
      <Modal>{children}</Modal>
    </ModalCtn>
  );
};

export default ChattingModal;
export const Modal = styled.div`
  width: 258px;
  height: 207px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 20px;
  }
  span {
    color: #383838;

    &.add {
      margin-top: 20px;
      font-family: Pretendard;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
    &.exit {
      margin-top: ${(props) => props.margin};
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }
    &.sub {
      margin-top: ${(props) => props.margin};
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      color: #797979;
      text-align: center;
    }
    &.leave {
      margin-top: ${(props) => props.margin};
      color: #fa3a45;
      font-weight: 500;
      font-size: 16px;
    }
    &.report {
      margin-top: 20px;
      font-family: Pretendard;
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
export const SubBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #f0f0f0;
  color: #505050;
`;
export const PriBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #fa3a45;
  color: #ffffff;
`;
export const BtnBox = styled.div`
  display: flex;
  gap: 20px;
  margin-top: ${(props) => props.margin};
`;
export const Exit = styled.img`
  position: absolute;
  cursor: pointer;
  left: 75%;

  top: 37%;
  bottom: 25%;
`;
