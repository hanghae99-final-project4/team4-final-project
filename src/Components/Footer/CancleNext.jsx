import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cancel from "../../Assets/CancleBtn.svg";
import next from "../../Assets/NextBtn.svg";

//동의서, 정보입력화면(칸) => 취소  + 다음 컴포넌트
//<CancelNext page="subwaypage"/>
const CancelNext = ({ page }) => {
  const navigator = useNavigate();
  return (
    <div>
      <CancelBtn
        onClick={(e) => {
          e.preventDefault();
          navigator(-1);
        }}
      >
        <img src={cancel} alt="cancle" />
      </CancelBtn>
      <NextBtn onClick={(e) => navigator(`"/${page}"`)}>
        <img src={next} alt="next" />
      </NextBtn>
    </div>
  );
};

export default CancelNext;

const CancelBtn = styled.button`
  width: 160px;
  float: left;
`;

const NextBtn = styled.button`
  width: 160px;
  float: right;
`;
