import React from "react";
import Agree from "../../Element/Agree";
import styled from "styled-components";
import Header from "../Header/Header";

const AgreePage = () => {
  return (
    <>
      <Header />
      <Wrap>
        <Agree />
        <div>고객님,</div>
        <br />
        <div>환영합니다!</div>
        <div className="everyagree">모두 동의 합니다</div>
        <br />
        <div className="agreetwo">이용약관 동의</div>
        <br />
        <div className="agreethree">이용약관 동의</div>
        <br />
        <div>
          <button className="cancel">취소</button>
          <button className="next">다음</button>
        </div>
      </Wrap>
    </>
  );
};
export default AgreePage;

const Wrap = styled.div`
  /* justify-content: center;
  text-align: center; */
  .everyagree {
    width: 340px;
    height: 50px;
    left: 18px;
    top: 353px;

    background-color: #efefef;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  .agreetwo {
    width: 340px;
    height: 84px;
    left: 18px;
    top: 476px;
    border-radius: 10px;

    background: #efefef;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .agreethree {
    width: 340px;
    height: 84px;
    left: 18px;
    top: 633px;
    border-radius: 10px;

    background: #efefef;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .cancel {
    width: 160px;
    height: 60px;
    left: 18px;
    top: 741px;

    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
  .next {
    width: 160px;
    height: 60px;
    left: 18px;
    top: 741px;

    background: #c3f4ff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
`;
