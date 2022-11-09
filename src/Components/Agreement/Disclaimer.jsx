import React from "react";
import styled from "styled-components";
const Disclaimer = () => {
  return (
    <Wrap>
      개인정보 수집 동의서
      <div>
        <br />
        <input type="checkbox" name="동의1" />
        동의
        <br />
        <input type="checkbox" name="동의2" />
        동의
        <br />
        <input type="checkbox" name="동의3" />
        전체 동의
      </div>
      <button>확인</button>
    </Wrap>
  );
};

export default Disclaimer;

const Wrap = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 200px;
  background-color: grey;
`;
