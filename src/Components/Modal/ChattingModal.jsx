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
const Modal = styled.div`
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
    margin-top: ${(props) => props.margin};
    &.add {
      font-family: Pretendard;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
    &.exit {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }
    &.sub {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      color: #797979;
      text-align: center;
    }
    &.leave {
      color: #fa3a45;
      font-weight: 500;
      font-size: 16px;
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
