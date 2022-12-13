# 챕터 6

## 9기 실전프로젝트, 항해 99

### 소개

- FE : 4조 김재우, 이상현, 남해리
- BE : 4조 안태환, 오윤지, 성용환
- 사용 편집기 : Visual Studio Code(vscode)
- 언어 및 프레임워크와 라이브러리 : 
FE: React, Javascript, styled-component, tailwind
BE: nodejs,Javascript,JWT,PASSPORT,mySQL,swagger,socketio

# 💗 코드 네임 : 환승 시민 🚆 💗

" 둘이 어떻게 만났어? "  
### " 우린 1호선에서 만났어. "  

<img alt="킹받는꼬맹이1" style="display: block; margin:0 auto; width:300px" src="https://res.cloudinary.com/dtkt6x68f/image/upload/v1668988410/github/60dcb93b1c5f46364f60f488b70aff9e_res_pwjpia.jpg"> <br>
<img alt="킹받는꼬맹이2" style="display: block; margin:0 auto; width:200px" src="https://res.cloudinary.com/dtkt6x68f/image/upload/v1668989263/github/3f394bc730abad7b4a07afa44112a444_res_agshcz.jpg">  

![로고오](https://user-images.githubusercontent.com/113084907/207002677-d4828de8-61cd-43ca-950f-2d636a13e115.jpg)

> 환승시민은 **랜덤매칭 채팅 서비스** 입니다. <br>


---
## 환승 시민 프로젝트 구성원
백엔드 팀  `BE`  
|팀내 포지션| 한 줄 소개 | 이름 | 깃허브 | 블로그 |
|--------|----------|-------|------|-------|
|리더| 레드 어몽이 |안태환|https://github.com/nowhereim|
|팀원| 마약 옥수수 |성용환|https://github.com/tlptop|
|팀원| 잇몸 알파카 |오윤지|https://github.com/doodlerrr|

프론트엔드 팀 `FE`
|팀내 포지션| 한 줄 소개 | 이름 | 깃허브 | 블로그 |
|--------|----------|-------|------|-------|
|부리더|   |김재우 |https://github.com/wyswhsl21|||
|팀원 |   |남해리|https://github.com/NSunR|||
|팀원 |   |이상현|https://github.com/shlee1027|||

## API 명세서  
아래는 API 명세서 입니다.
|    _   |  Method |   URI    |  REQUEST  |  RESPONSE  | 추가 설명 |
|--------|---------|----------|-----------|------------|---------|
|가입 초기 필수 입력 정보 받기|POST|/user| { representProfile: 이미지파일, nickname: "yuyu", phone: "01022760716", gender: false} |{ msg: "가입 되었습니다" }|대표 프로필 및 유저정보 초기값 업로드, `인증 토큰 필수`|
|SMS인증문자발송|POST|/auth/phone|{phone:"01022760716"}|{ msg: "인증 메시지를 전송했습니다"}|인증번호 유효시간 2분|
|SMS인증번호비교(검증)|POST|/auth/compare| { phone:"01022760716", auth : "ak2435" }|{ status: 200, statusMassage: "ok, 전송되었습니다."}|-|
|마이 프로필 업데이트| POST | /profile | { representProfile: 이미지파일, profileImage: [이미지파일], nickname: "jiji", statusmessage: "멋쟁이 4조" } | { status: 200, msg: "유저 프로필 정보가 수정되었습니다"}| `인증 토큰 필수` |
|마이 프로필 조회   | GET  | /profile | - | { msg: "유저 프로필이 조회되었습니다", body: userProfileInfo } | `인증 토큰 필수` |
|마이 프로필 삭제(회원 탈퇴 시)| DELETE | /profile| - | - | `인증 토큰 필수` |
---
### 아키텍처

![qwe jpg drawio](https://user-images.githubusercontent.com/113084907/207002835-50b4fa8f-d4f5-4435-99a3-b802ec551c78.png)



### 라이브러리

- 사용 편집기 : 	<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />

- 언어 및 프레임워크와 라이브러리 : 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black">, <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>,<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>,  <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white">,
   <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>,<img src="https://img.shields.io/badge/socket.io-010101?style=flat-square&logo=socket.io&logoColor=white">, react zoom and pan 
