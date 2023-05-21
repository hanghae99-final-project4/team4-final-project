import React from 'react';
import { ReactComponent as HeaderPointer } from '../Assets/HeaderItem/HeaderPointer.svg';
import { useNavigate } from 'react-router-dom';

const ChattingIcon = () => {
  return (
    <HeaderPointer
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default ChattingIcon;
