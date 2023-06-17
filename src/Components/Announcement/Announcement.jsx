import React from 'react';
import styled from 'styled-components';

const Announcement = () => {
  return (
    <Wrap>
      <AnnounceItem>
        <span className="tag">{'[이벤트]'}</span>
        <span className="title">{'환승시민 이벤트 당첨자'}</span>
        <div>
          <span className="day">{'2023.06.15'}</span>
          <span className="new">New</span>
        </div>
      </AnnounceItem>
    </Wrap>
  );
};

export default Announcement;

const Wrap = styled.div`
  margin: 16px 0 0 20px;
  display: flex;
  flex-direction: column;
`;
const AnnounceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  div {
    display: flex;
    gap: 2px;
  }
  span {
    &.tag {
      font-family: Pretendard;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;

      color: #8fb398;
    }
    &.title {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: #333333;
    }
    &.day {
      color: #8f8f8f;
      font-family: Pretendard;
      font-size: 10px;
      font-weight: 400;
      line-height: 12px;
      letter-spacing: -0.01em;
      text-align: left;
    }
    &.new {
      color: #fa3a45;
      font-family: Pretendard;
      font-size: 8px;
      font-weight: 400;
      line-height: 10px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
