import React from 'react';
import { ReactComponent as HeaderPointer } from '../Assets/Station/headericon.svg';
import { useNavigate } from 'react-router-dom';
const HeaderIcon2 = () => {
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
export default HeaderIcon2;
