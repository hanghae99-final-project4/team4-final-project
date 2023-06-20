import React from 'react';
import { AnnounceItem, DescriptionBox } from './Announcement';
import { useRecoilState } from 'recoil';
import { useDetailState } from '../../Recoil/userList';

const AnnounceDetail = () => {
  const [description, setDesCription] = useRecoilState(useDetailState);
  return (
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
  );
};

export default AnnounceDetail;
