import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useReportState } from '../../Recoil/userList';
import { trainApi, trainApi2 } from '../../apis/Instance';
import { SmallToast } from '../Profile/Mypage';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState('');
  const [text, setText] = useState('');
  const [toast, setToast] = useState(false);
  const counter = useRecoilValue(useReportState);

  const CheckList = [
    { id: '1', value: '음란,욕설 등 부적절한 내용' },
    { id: '2', value: '개인정보 유출 위험' },

    { id: '4', value: '저작권 불법 도용(사진 등)' },
    { id: '5', value: '공고 및 홍보' },
    { id: '6', value: '정치 및 종교 대화 시도' },
    { id: '7', value: '프로필 사진 신고' },
    { id: '8', value: '신고 항목 제안 ' },
    { id: '9', value: '기타 (내용 하단 기재 가능)' },
  ];
  const checkboxHandler = (e) => {
    setSelectValue(e.target.value);
  };
  const textHandler = (e) => {
    setText(e.target.value);
  };
  const reportHandler = async () => {
    const Id = localStorage.getItem('userId');
    const userId = Number(Id);
    try {
      //   const formData = new FormData();
      //   formData.append('repoter', Id);
      //   formData.append('reported', counter);
      //   formData.append('title', '신고');
      //   if (selectValue === '기타 (내용 하단 기재 가능)') {
      //     formData.append('description', text);
      //   } else {
      //     formData.append('description', selectValue);
      //   }
      if (selectValue === '기타 (내용 하단 기재 가능)') {
        const { data } = await trainApi.reportuser(userId, counter, text);
        if (data) {
          setToast(true);
        }
      } else {
        const { data } = await trainApi.reportuser(
          userId,
          counter,
          selectValue
        );
        if (data) {
          setToast(true);
        }
      }
      return (
        setTimeout(() => setToast(false), 3000),
        setTimeout(() => navigate(-1), 3000)
      );
    } catch (err) {}
  };

  return (
    <Wrap>
      {toast && <SmallToast>정상적으로 신고가 접수 되었습니다.</SmallToast>}
      <TextBox>
        <span>신고 사유를 선택해주세요.</span>
        <span className="essential">(필수)</span>
      </TextBox>
      <CheckBox>
        {CheckList.map((item) => (
          <CheckItem key={item.id}>
            <input
              onChange={checkboxHandler}
              checked={selectValue === item.value}
              value={item.value}
              type="checkbox"
            />{' '}
            <span>{item.value}</span>
          </CheckItem>
        ))}
        {selectValue === '기타 (내용 하단 기재 가능)' ? (
          <>
            <EtcTextArea
              value={text}
              onChange={textHandler}
              placeholder="관계없는 글(비방, 욕설,광고 등) 을 신고해 주시면, 관리자 확인 후 해당 리뷰의 노출이 제한될 수 있습니다.
          타당한 사유 없이 허위 신고 시 신고자에 대한 활동제한이 가해질 수 있으니, 신고전에 신중하게 제고해 주시기 바랍니다.
          "
            ></EtcTextArea>
            <Length className="length">{text.length}/80</Length>
          </>
        ) : (
          ''
        )}
      </CheckBox>
      <ReportBtn
        className={selectValue || text ? 'active' : ''}
        onClick={reportHandler}
      >
        신고하기
      </ReportBtn>
    </Wrap>
  );
};

export default Report;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    &.essential {
      color: #fa3a45;
    }
    &.length {
      margin-top: 2px;
      height: 11px;
      width: 343px;
      display: flex;
      flex-direction: row-reverse;
      font-family: Pretendard;
      font-size: 9px;
      font-weight: 300;
      line-height: 11px;
      letter-spacing: 0em;
      text-align: center;
      color: #7a7a7a;
    }
  }
`;
const TextBox = styled.div`
  margin: 20px 0 0 16px;
`;
const CheckBox = styled.div`
  margin: 20px 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CheckItem = styled.div`
  display: flex;
  gap: 10px;
  input {
    width: 24px;
    height: 24px;
    appearance: none;
    border: 1px solid #2d2d2d;
    border-radius: 4px;
    &:checked {
      width: 24px;
      height: 24px;
      border: 1px solid #2d2d2d;
      border-radius: 4px;

      background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5L5.14286 11L12 1' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
`;
const ReportBtn = styled.button`
  margin-left: 16px;
  margin-top: 179px;
  width: 343px;
  height: 50px;
  background: rgba(250, 58, 69, 0.3);
  color: #ffffff;
  &.active {
    background-color: #fa3a45;
  }
`;
const EtcTextArea = styled.textarea`
  outline: none;
  resize: none;
  height: 100px;
  width: 343px;
  left: 16px;
  top: 416px;
  border-radius: 4px;
  padding: 13px 10px 13px 10px;

  margin-top: 10px;
`;
const Length = styled.span`
  margin-top: 2px;
  height: 11px;
  width: 343px;
  display: flex;
  flex-direction: row-reverse;
  font-family: Pretendard;
  font-size: 9px;
  font-weight: 300;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: center;
  color: #7a7a7a;
`;
