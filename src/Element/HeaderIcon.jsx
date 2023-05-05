import React from 'react';
import { ReactComponent as HeaderPointer } from '../Assets/HeaderItem/HeaderPointer.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderIcon = () => {
  const navigate = useNavigate();
  return (
    <HeaderPointer
      onClick={() => navigate(-1)}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default HeaderIcon;
