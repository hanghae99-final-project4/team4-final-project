import React from 'react';
import { ReactComponent as HeaderPointer } from '../Assets/HeaderItem/HeaderPointer.svg';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderIcon = () => {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <HeaderPointer
      onClick={
        location?.pathname === '/changename'
          ? () => navigate('/mypage')
          : location?.pathname === '/mypage'
          ? () => navigate('/subwaypage')
          : () => navigate(-1)
      }
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

export default HeaderIcon;
