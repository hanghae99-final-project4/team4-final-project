import React, { useRef } from "react";
import styled from "styled-components";
import Accordion from "../../MyTools/Accordion";
import { useNavigate } from "react-router-dom";

const Agree = () => {
  const navigate = useNavigate();
  const allRef = useRef();
  const checkbox1 = useRef();
  const checkbox2 = useRef();
  const checkbox3 = useRef();

  const allinputHandler = () => {
    const isChecked =
      checkbox1.current.checked &&
      checkbox2.current.checked &&
      checkbox3.current.checked;
    checkbox1.current.checked = !isChecked;
    checkbox2.current.checked = !isChecked;
    checkbox3.current.checked = !isChecked;
    allRef.current.checked = !isChecked;

    console.log(checkbox1);
    console.log(checkbox2);
    console.log(checkbox3);
  };
  const nextHandler = () => {
    navigate("/signup");
  };

  const contents = (
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat tenetur
      reiciendis excepturi deserunt dolores, at quae? Odit veniam libero,
      incidunt in illo eius praesentium quia rerum eaque illum perspiciatis
      sint.
    </p>
  );
  return (
    <Wrap>
      <AgreeBox>
        <AgreeLabel for="checkboxall">
          <AllInput
            ref={allRef}
            onClick={allinputHandler}
            type="checkbox"
            id="checkboxall"
          ></AllInput>
          <Span>모두 동의</Span>
        </AgreeLabel>
        <AgreeLabel for="checkbox1">
          <Input ref={checkbox1} type="checkbox" id="checkbox1"></Input>
          <Accordion title="이용 약관(필수)" contents={contents} />
        </AgreeLabel>

        <AgreeLabel for="checkbox2">
          <Input ref={checkbox2} type="checkbox" id="checkbox2"></Input>
          <Accordion
            title="개인정보 수집 및 이용 동의 (필수)"
            contents={contents}
          />
        </AgreeLabel>
        <AgreeLabel for="checkbox3">
          <Input ref={checkbox3} type="checkbox" id="checkbox3"></Input>

          <Accordion title="만 14세 이상입니다. (필수)" contents={contents} />
        </AgreeLabel>
      </AgreeBox>
      <LoginButton onClick={nextHandler}>다음</LoginButton>
    </Wrap>
  );
};

export default Agree;
const Wrap = styled.div`
  margin-top: 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AgreeBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 343px;
  height: 230px;
`;
const AllInput = styled.input`
  height: 25px;
  width: 25px;
`;
const Input = styled.input`
  border-radius: 50%;
  width: inherit;
  position: relative;
  right: 18px;
  height: 25px;
`;
const AgreeLabel = styled.label`
  gap: 10px;
  width: 343px;
  height: 50px;
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
`;
const LoginButton = styled.button`
  margin-top: 30px;
  width: 343px;
  height: 50px;
  color: #ffffff;
  background-color: rgba(250, 58, 69, 0.3);
`;
const Span = styled.span`
  color: #4d4d4d;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;
