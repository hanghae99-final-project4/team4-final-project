import React from "react";
import { KAKAO_AUTH_URL } from "../Components/IntroMain/Oauth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComment } from "@fortawesome/free-solid-svg-icons";
// import naverBtn from "../public/img/naverBtn.png";
// import googleBtn from "../public/img/googleBtn.png";

import styled from "styled-components";

const SocialLogin = () => {
  const onClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <SocialLoginStyle>
      <div className="btnWrap kakaoWrap" onClick={onClickKakao}>
        {/* <FontAwesomeIcon
          icon={faComment}
          style={{
            width: "30px",
            height: "30px",
          }}
        /> */}
        <div>카카오로 로그인</div>
      </div>
      {/* <div className="naverWrap" onClick={onClickNaver}>
        <img
          src={naverBtn}
          alt="naver"
          style={{
            width: "72px",
            height: "72px",
            cursor: "pointer",
          }}
        ></img>
      </div> */}
      {/* <div className="btnWrap googleWrap" onClick={onClickGoogle}>
        <img
          src={googleBtn}
          alt="google"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        />
      </div> */}
    </SocialLoginStyle>
  );
};

const SocialLoginStyle = styled.div`
  display: flex;
  justify-content: space-around;

  .btnWrap {
    cursor: pointer;
    padding: 21px;
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  .kakaoWrap {
    background-color: #fedb00;
  }

  .googleWrap {
    background-color: #ffffff;
  }
`;
// 주소창에
// https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=0wSIvykcfvmOTk3Dz4fS&client_secret=oQne0wSuP7&access_token=AAAANefUOe8jvoOYFOV1WiS0QZCD0SVN_JOtIg2WuRbDv24LdID7Sphk70difRV3rTX8cHmCKOuAX1Sb6HcVk0LjVJI&service_provider=NAVER
// 치면 네이버 로그아웃 가능
export default SocialLogin;
