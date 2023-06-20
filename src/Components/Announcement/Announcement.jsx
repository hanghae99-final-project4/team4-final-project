import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { trainApi } from '../../apis/Instance';

const Announcement = () => {
  const [notice, setNotice] = useState([]);
  const [description, setDescription] = useState([]);
  const [isDes, setIsDes] = useState(false);
  const [account, setAccount] = useState([]);
  useEffect(() => {
    getUser();
    getAnnounce();
  }, []);
  const getUser = async () => {
    const Id = localStorage.getItem('userId');
    const { data } = await trainApi.getConvers(Id);
    setAccount(data?.userInfo?.result?.account_type);
  };
  const getAnnounce = async () => {
    const { data } = await trainApi.getNotice();
    setNotice(data);
  };
  const deleteNoticeHandler = async (Id) => {
    const { data } = await trainApi.deleteAnnounce(Id);
  };

  const navigate = useNavigate();

  const descriptionHandler = async (Id) => {
    const { data } = await trainApi.getDescription(Id);

    setDescription([data]);
    setIsDes(true);
  };

  return (
    <Wrap>
      {account === 'admin' && (
        <button onClick={() => navigate('/announcewrite')}>
          공지사항 작성
        </button>
      )}

      {isDes ? (
        <>
          {description?.map((item) => (
            <>
              <AnnounceItem className="description">
                <span className="tag">{item.tag}</span>
                <span className="title">{item.title}</span>
                <div>
                  <span className="day">{item.createdAt.slice(0, 10)}</span>
                  <span className="new">New</span>
                </div>
              </AnnounceItem>
              <DescriptionBox>{item.description}</DescriptionBox>
            </>
          ))}
        </>
      ) : (
        <>
          {notice.map((item) => (
            <AnnounceItem onClick={() => descriptionHandler(item.id)}>
              <span className="tag">{item.tag}</span>
              <span className="title">{item.title}</span>
              <div>
                <span className="day">{item.createdAt.slice(0, 10)}</span>
                <span className="new">New</span>
              </div>
              {account === 'admin' && (
                <button onClick={() => deleteNoticeHandler(item.id)}>
                  삭제하기
                </button>
              )}
            </AnnounceItem>
          ))}
        </>
      )}
    </Wrap>
  );
};

export default Announcement;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const AnnounceItem = styled.div`
  &.description {
    cursor: default;
  }
  margin: 20px 0 0 16px;
  display: flex;
  cursor: pointer;
  width: 21.4375rem;
  height: 4.8125rem;
  flex-direction: column;
  border-bottom: 1px solid #e2e2e2;
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
const DescriptionBox = styled.div`
  margin-top: 20px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;
