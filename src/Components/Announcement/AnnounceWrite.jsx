import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import { Select } from '../Logout/Logout';
import selectimg from '../../Assets/Logout/selecticon.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { trainApi } from '../../apis/Instance';
const AnnounceWrite = () => {
  const schema = yup.object().shape({
    tag: yup
      .string() //문자열 체크

      .required('tag를 입력해주세요.'), // 빈칸인지 체크
    title: yup
      .string() //문자열 체크

      .required('제목을 입력해주세요.'), // 빈칸인지 체크
    description: yup
      .string() //문자열 체크

      .required('상세사유를 입력해주세요.'), // 빈칸인지 체크
  });

  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const getFields = getValues();
  const noticeHandler = async (data) => {
    const tag = data.tag;
    const title = data.title;
    const description = data.description;
    try {
      const response = await trainApi.postNotice(title, description, tag);
    } catch (err) {}
  };
  return (
    <Wrap onSubmit={handleSubmit(noticeHandler)}>
      <div>
        <Text>tag</Text>
      </div>

      <Select {...register('tag')} background={selectimg}>
        <option value="" disabled selected>
          선택해주세요
        </option>
        <option value="[이벤트]">{'[이벤트]'}</option>
        <option value="[업데이트]">{'[업데이트]'}</option>
        <option value="[공지]">{'[공지]'}</option>
      </Select>
      <div>
        <Text>title</Text>
      </div>
      <Title {...register('title')} />
      <div>description</div>
      <Discription {...register('description')} />
      <button type="submit">작성하기</button>
    </Wrap>
  );
};

export default AnnounceWrite;
const Wrap = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 16px;
`;
const Text = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;
const Title = styled.input`
  height: 43px;
  width: 343px;
  left: 0px;
  top: 39px;
  border-radius: 4px;
  padding: 13px 10px 13px 10px;
  border: 1px solid #78787878;
  border-radius: 0.25rem;
`;
const Discription = styled.textarea`
  outline: none;
  resize: none;
  height: 71px;
  width: 343px;
  left: 16px;
  top: 522px;
  border-radius: 4px;
  padding: 13px 10px 13px 10px;
  border: 1px solid rgba(120, 120, 120, 0.470588);
  border-radius: 4px;
`;
