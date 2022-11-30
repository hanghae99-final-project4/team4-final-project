import React from "react";
import styled from "styled-components";
const ProfileModal = ({
  isModal,
  setIsModal,
  url,
  setUrl,
  inputRef,
  files,
  thumb,
}) => {
  const PictureUpload = () => {
    inputRef.current.click();
  };
  return (
    <ModalCtn>
      <ModalWrap>
        <ModalProfileDiv>{thumb}</ModalProfileDiv>

        <ProfileSetBtn onClick={() => PictureUpload()}>
          프로필 설정하기
<<<<<<< HEAD
          프로필 사진 바꾸기
        </ProfileSetBtn>
        <ProfileCloseBtn onClick={() => setIsModal(!isModal)}>
          나가기
          저장 후 나가기
=======
        </ProfileSetBtn>
        <ProfileCloseBtn onClick={() => setIsModal(!isModal)}>
          나가기
>>>>>>> parent of 8351c17 (이상현: Mypage CSS 작업, 라우터 변경, ConversPage 코드 수정)
        </ProfileCloseBtn>
      </ModalWrap>
    </ModalCtn>
  );
};

export default ProfileModal;

const ModalCtn = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  display: ${(isModal) => (isModal ? "block" : "none")};
  position: fixed;

  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const ModalWrap = styled.div`
  position: relative;
  border-radius: 5px;
  left: 450px;
<<<<<<< HEAD
  left: 300px;
  top: 200px;
  width: 1100px;
  width: 800px;
=======
  top: 200px;

  width: 1100px;
>>>>>>> parent of 8351c17 (이상현: Mypage CSS 작업, 라우터 변경, ConversPage 코드 수정)
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ModalProfileDiv = styled.div`
  width: 375px;
<<<<<<< HEAD
  width: 800px;
=======
>>>>>>> parent of 8351c17 (이상현: Mypage CSS 작업, 라우터 변경, ConversPage 코드 수정)
  height: 300px;
  display: flex;
  flex-direction: row;
  position: relative;
  right: 170px;
<<<<<<< HEAD
  right: -80px;
=======
>>>>>>> parent of 8351c17 (이상현: Mypage CSS 작업, 라우터 변경, ConversPage 코드 수정)
`;

const ProfileCloseBtn = styled.button`
  position: relative;
  bottom: -150px;
  width: 150px;
  height: 50px;
<<<<<<< HEAD
  border: 2px solid #71c9dd;
  border-radius: 30px;
  right: 500px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
=======
>>>>>>> parent of 8351c17 (이상현: Mypage CSS 작업, 라우터 변경, ConversPage 코드 수정)
`;
const ProfileSetBtn = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  bottom: -150px;
  left: -100px;
`;
 8  
src/Components/Profile/CustomerNotice.jsx
@@ -1,6 +1,12 @@
import React from "react";
import GuideIcon from "../../Element/GuideIcon";

const CustomerNotice = () => {
  return <div>고객 유의 사항</div>;
  return (
    <div>
      <GuideIcon />
      고객 유의 사항
    </div>
  );
};
export default CustomerNotice;
 9  
src/Components/Profile/CustomerUserGuide.jsx
@@ -1,6 +1,13 @@
import React from "react";

const CustomerUserGuide = () => {
  return <div>고객 이용 가이드</div>;
  return (
    <>
      고객 이용 가이드
      <div>
        <butoon>고객이용가이드</butoon>
      </div>
    </>
  );
};
export default CustomerUserGuide;
  208  
src/Components/Profile/Mypage.jsx
@@ -24,9 +24,9 @@ const MyPage = () => {
  const token = cookies.get("token");
  const navigator = useNavigate();

  console.log(token);
  // console.log(token);

  const thURl = process.env.REACT_APP_YJ_HOST;
  const thURl = process.env.REACT_APP_TH_S_HOST;

  useEffect(() => {
    async function getProfile() {
@@ -39,23 +39,7 @@ const MyPage = () => {
      setForm(data.body);
    }
    getProfile();
  }, []);

  // const onGetInfo = async () => {
  //   try {
  //     //headers에 토큰넣어서 get하면 해당 토큰에 대한 정보들 받아올 수 있음.
  //     const { data } = await axios.get(`${thURl}/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     //get한 data
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //get(name, [options])
  }, [form?.representProfile]);

  async function imgSubmitHandler() {
    const formData = new FormData();
@@ -104,6 +88,7 @@ const MyPage = () => {

    console.log(e.target);
  };

  //preview 이미지 함수
  const thumb = files.map((item, index) => {
    return (
@@ -142,14 +127,12 @@ const MyPage = () => {
  const removeProfile = (deleteUrl) => {
    setFiles(files.filter((item) => item.url !== deleteUrl));
  };
  console.log(url);
  console.log(form);

  return (
    <Wrap>
      <MyinfoDiv>
        <div className="logoutbox">
          <span style={{ fontSize: "20" }}>나의 정보</span>
          <span style={{ fontSize: "20" }}>나의정보</span>
          <LogoutBtn
            onClick={(e) => {
              e.preventDefault();
@@ -162,89 +145,109 @@ const MyPage = () => {
          </LogoutBtn>
        </div>
      </MyinfoDiv>

      <div className="profilebutton">프로필</div>
      <AttachPicture>
        <ProfileImgDiv>
          <div className="img-preview">
            <ImgPreview
              style={{ transform: "scale(1)", borderRadius: "10px" }}
              id="img-preview"
              src={form.representProfile}
              src={form?.representProfile}
            />
          </div>

          <UploadImage
            maxSize={314572800}
            type="file"
            name="profile"
            ref={inputRef}
            value={form.profile}
            value={form?.profile}
            accept="image/*"
            multiple
            onChange={(e) => formSubmit(e)}
          ></UploadImage>
          <RechangeImgBtn onClick={() => setIsModal(!isModal)}>
            프로필 선택
            사진 첨부
          </RechangeImgBtn>
        </ProfileImgDiv>

        <div className="information">
          <PhoneNumDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>
              휴대전화 번호
            </span>
            <span style={{ fontSize: "20", fontWeight: "600" }}>휴대폰</span>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              // 폰넘버를 겟에서 받아온 그걸 적어라
              value={form?.phoneNumber}
              onChange={OnChangeHandler}
            />
          </PhoneNumDiv>
          <NicnameDiv>
          <NicknameDiv>
            <span style={{ fontSize: "20", fontWeight: "600" }}>닉네임</span>
            <input
              onChange={OnChangeHandler}
              name="nickname"
              value={form.nickname}
              value={form?.nickname}
            />
          </NicnameDiv>
          </NicknameDiv>
          <GenderDiv>
            성별
            <input
              type="checkbox"
              name="gender"
              checked={check}
              value={form.gender}
              onChange={() => setCheck(true)}
            />
            여자
            <input
              type="checkbox"
              name="gender"
              checked={check}
              value={form.gender}
              onChange={() => setCheck(false)}
            />
            남자
            {form?.gender === true ? (
              //여자면 여자 그림 남자면 남자 그림 svg 코드 가져오기
              <>
                성별
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form.gender}
                />
                여자
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form.gender}
                />
                남자
              </>
            ) : (
              <>
                성별
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form?.gender}
                />
                여자
                <input
                  type="checkbox"
                  name="gender"
                  checked={check}
                  value={form?.gender}
                />
                남자
              </>
            )}
          </GenderDiv>

          <CommentDiv>
            <CommentTextArea
              placeholder="상태 메시지"
              placeholder="상태메시지"
              onChange={OnChangeHandler}
              name="statusmessage"
              value={form.statusmessage}
              value={form?.statusmessage}
            ></CommentTextArea>
          </CommentDiv>
        </div>
      </AttachPicture>
      <div>
        <SaveBtn onClick={() => imgSubmitHandler()}>저장 버튼</SaveBtn>
      </div>
      <div></div>
      <div className="client">
        <button>고객유의사항</button>
        <button>고객이용가이드</button>
        <SaveBtn onClick={() => imgSubmitHandler()}>저장</SaveBtn>
      </div>

      <Customer>
        <button className="button1">고객유의사항</button>

        <button className="button2">고객이용가이드</button>
      </Customer>
      {isModal && (
        <ProfileModal
          isModal={isModal}
@@ -280,6 +283,12 @@ const Wrap = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  .profilebutton {
    border-radius: 30px;
    border: 2px solid #71c9dd;
    background-color: #e6e6e6;
  }
`;

const AttachPicture = styled.div`
@@ -289,7 +298,7 @@ const AttachPicture = styled.div`
  }
  color: black;
  width: 700px;
  height: 300px;
  height: 350px;
  padding: 60px;
  border-radius: 10px;
  border: none;
@@ -301,14 +310,15 @@ const AttachPicture = styled.div`
`;

const LogoutBtn = styled.button`
  background: #ffcd29;
  background: #71c9dd;
  border: none;
  border-radius: 10px;
  color: black;
  width: 90px;
  height: 40px;
`;

// 사진 첨부 프리뷰입니다.
const ImgPreview = styled.img`
  border-style: solid;
  border: none;
@@ -328,17 +338,26 @@ const ViewImage = styled.button`
  right: 35%;
  margin-top: 350px;
`;

// 나의정보, 로그아웃 최상단 버튼입니다.
const MyinfoDiv = styled.div``;

const PhoneNumDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const NicnameDiv = styled.div`
const NicknameDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 72px;
  gap: 20px;
  margin-top: 20px;
  .input {
    border: 1px solid black;
    outline: 1px solid blue;
  }
`;
const GenderDiv = styled.div`
  display: flex;
@@ -347,27 +366,30 @@ const GenderDiv = styled.div`
  margin-top: 20px;
`;
const CommentDiv = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const CommentTextArea = styled.textarea`
  font-size: 20px;
  width: 350px;
  height: 180px;
  height: 111px;
`;
const SaveBtn = styled.button`
  background-color: #ffcd29;
  background-color: #71c9dd;
  border-radius: 10px;
  border: none;
  width: 100px;
  width: 700px;
  height: 40px;
`;
const ProfileImgDiv = styled.div`
  input {
    display: none;
  }
`;

// 사진 첨부 버튼입니다.
const RechangeImgBtn = styled.button`
  width: 200px;
  height: 40px;
@@ -376,44 +398,20 @@ const RechangeImgBtn = styled.button`
  background-color: #757575;
  color: white;
  border: none;
  border-radius: 30px;
`;
const Customer = styled.div`
  justify-content: space-between;
  margin-top: 30px;
  width: 700px;
  display: flex;
  .button1 {
    border: 2px solid #71c9dd;
    border-radius: 20px;
  }
  .button2 {
    border: 2px solid #71c9dd;
    border-radius: 20px;
  }
`;

export default MyPage;

//악시오스를 써라 //리퀘스트로 뭘 보내라\
// 악시오스 겟을 쓰는게 더 났다 겟할때 요청url말고 보낼수있는 인자
// 인증토큰(엑세스토큰) 어디다 저장하기로했나? 이걸 물어보기
// 리프레시토큰 엑세스 토큰 소셜로그인 사용하면...
// 로그인될때 어디 저장되는지 알아야함
// 세션이나 로컬에 저장이 될거임
// getItemtoken? 토큰 가져오는 코드 한줄 쓰고
// 악시오스 겟 할때 데이터에 실어서 보낼거다
// 어싱크 어웨이트

// 물어볼것
// 로컷 스토리지에 토큰이 있냐? 어디에 존재하냐?
// 어떤 키값으로 되어있냐? 여쭤보기
// 구글링할때 어디에 존재하는 토큰을 가져올때 검색해보기
// 리턴 밑에 잘 분배해서 뿌려주면된다

// useEffect(() => {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   axios(`${process.env.REACT_APP_YJ_HOST}/user`, requestOptions)
//     .then((response) => response.json())

//     // []
//     // setRepresentProfile([]) 배열로 들어오면 이걸 그대로 써라
//     // 셋리프레젠트프리필에 넣어주라
//     // 셋 이미지
//     .then((result) => setPhotos(result))
//     .catch((error) => console.log("error".error));
// }, []);

// get 리스폰즈값을 받으면 배열에 저장해서 그 배열을 맵을 돌려서 아이템값을 지정해줘라
// get요청을 하면 보내준다 닉네임같은걸 그값을 유저프로필이라는 스테이트를 만들어서 셋 유저 프로필을 그 값을 넣어준다
// 그럼 그값이 들어간다 맞는 장소에 값을 넣어주면 띄어진다
//쿠키의 바디값이 뭔지 알아야함!!
//리스폰스값
 14  
src/Element/GuideIcon.jsx
@@ -0,0 +1,14 @@
import React from "react";
import { ReactComponent as GuideIconItem } from "../Assets/GuideIcon.svg";
import { ReactComponent as GuideIconItemtwo } from "../Assets/GuideIcontwo.svg";

const GuideIcon = () => {
  return (
    <div>
      <GuideIconItem />
      <GuideIconItemtwo />
    </div>
  );
};

export default GuideIcon;
  4  
src/Pages/ConversPage.jsx
@@ -9,7 +9,7 @@ import HomeMenu from "../Components/HomeMenu/HomeMenu";
const cookies = new Cookies();
const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
const token = cookies.get("token");
console.log(token);

const ConversPage = () => {
  const initialState = {
    nickname: "",
@@ -56,7 +56,7 @@ const ConversPage = () => {
        }
      );
      console.log(data);
      setMessage(data.body);
      setMessage(data.user);
    }
    getNickname();
  }, []);
  4  
src/Shared/Router.js
@@ -13,6 +13,8 @@ import Disclaimer from "../Components/Agreement/Disclaimer";
import ConversPage from "../Pages/ConversPage";
import ChattingPage from "../Pages/ChattingPage";
import SubwayPage from "../Pages/SubwayPage";
import CustomerUserGuide from "../Components/Profile/CustomerUserGuide";
import CustomerNotice from "../Components/Profile/CustomerNotice";

const Router = () => {
  return (
@@ -31,6 +33,8 @@ const Router = () => {
        <Route path="/converspage" element={<ConversPage />} />
        <Route path="/chattingpage" element={<ChattingPage />} />
        <Route path="/subwaypage" element={<SubwayPage />} />
        <Route path="/customerUserGuide" element={<CustomerUserGuide />} />
        <Route path="/customerNotice" element={<CustomerNotice />} />
      </Routes>
    </BrowserRouter>
  );
