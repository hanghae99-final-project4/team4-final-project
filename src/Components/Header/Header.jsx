import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderIcon from '../../Element/HeaderIcon';

const Header = ({ msg, margin, children }) => {
  return (
    <div>
      {' '}
      <MainHeader>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        {children}
      </MainHeader>
    </div>
  );
};
export default Header;
const MainHeader = styled.div`
  position: relative;
  font-family: Pretendard;
  font-style: Medium;
  border-bottom: 1px solid #f5f5f5;
  background-color: #ffffff;
  height: 48px;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  width: 375px;
`;
const PointerBox = styled.div`
  margin-left: 16px;
`;
export const MessageBox = styled.div`
  margin-left: ${(props) => props.margin};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 17px;
`;
