## 9기 4조 실전프로젝트, 항해 99

# 💗 코드 네임 : 환승 시민 🚆 💗

![로고오](https://user-images.githubusercontent.com/113084907/207002677-d4828de8-61cd-43ca-950f-2d636a13e115.jpg)
> 환승시민은 **랜덤매칭 채팅 서비스** 입니다. <br>
<br />

## 🧑👩‍🦰 서비스 소개 <br> 
짧은 시간안에 이루어지는 인연, 인생은 타이밍, 옷깃도 스치면 인연 등등 한번쯤은 들어보셨을건데요,
앞에서 설명한 키워드처럼 바쁜현대인이 매일 이용하는 교통수단인 지하철을 통해서 다양한 사람을 만날 수 있는 기회를 제공해주면 어떨까 라는 취지로 시작하게 되었습니다.
요즘 지하철이나 다른 대중교통을 이용하면 다들 각자 핸드폰만 보고 주변 사람들을 잘 살피지않습니다. 이러한 개인주의 사회에 공동체 결속감을 강화시키고자 대면은 아니지만 주변 사람들에게 관심을 가질 수 있는 기회를 제공하고자합니다. 다른 사람들에게 관심을 가지며 다양한 생각, 가치관, 정보, 재미를 공유할 수 있는 기회가 될 것입니다.
최종적으로 지하철 출.퇴근, 혹은 이동하는 시간 동안 사람들에게 즐거움을 선사하는 것이 저희 팀의 목표입니다.🙋‍♀️🙋‍♂️

❤[환승시민 이용해보기 Click!](https://team4-final-project.vercel.app/) <br>
❤[환승시민 팀 노션 Click!](https://www.notion.so/7899ad12f6a44190bef2aa4b53be9614)

## 💙❤ 서비스 개요 <br>
같은 지하철, 같은 칸에 타고 있는 사람들끼리 1:1로 실명 혹은 익명 선택제로 부담없이 내리기 전까지 자유롭게 채팅을 할 수 있는 기회를 제공합니다. 대화 도중 둘 중 한 사람이 먼저 내리게 된다면 그 동안 나누었던 대화는 사용자의 개인정보를 위해 전부 사라지게 됩니다. 만약 대화 중 상대방과 더 깊은 관계를 원한다면 지하철에서 내리기 전에 개인정보를 서로 동의하에 공유해야만 지속적인 연락이 가능합니다.💌


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
|부리더| 산타 |김재우 |https://github.com/wyswhsl21|||
|팀원 | 건치감자 |남해리|https://github.com/NSunR|||
|팀원 | 루돌프 |이상현|https://github.com/shlee1027|||

***

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

***

## 🛠 프로젝트 아키텍처

![qwe jpg drawio](https://user-images.githubusercontent.com/113084907/207002835-50b4fa8f-d4f5-4435-99a3-b802ec551c78.png)

<br />

***

## Front-End 라이브러리

- 사용 편집기 : 	<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />

- 언어 및 프레임워크와 라이브러리 : 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black">, <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>,<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>,  <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white">,
   <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>,<img src="https://img.shields.io/badge/socket.io-010101?style=flat-square&logo=socket.io&logoColor=white">, react zoom and pan 


<br />

***

## 주요기능 구성

1. 소셜로그인(passport)

   - 카카오, 구글, 네이버가 구비되어있고, 
     다양한 선택지의 간편로그인으로 서비스를 이용할 수 있습니다.

     

2. 일반 로그인, 회원가입, 추가정보(환승시민 인증정보)

   - 빠른 로그인으로 서비스를 접할 수 있고, 환승시민만의 추가인증정보로 서비스를 이용하는 이용자에게 매칭되는 상대에 대한 실제 인증 정보에 대해 신뢰도를 높여줍니다.

3. 마이페이지

   - FormData전송 get, post로 이미지(최대 5개)를 등록하고 대표이미지(represent image)를 정해서 다른 유저에게 자신의 인상을 주고 상태메세지를 통해 자신을 소개할 수 있습니다.

     

4. 1:1 채팅기능  ([Socket.io](http://Socket.io))

   - 본인이 탑승하는 열차에 한정된 채팅범위를 뒀습니다.
   - 채팅 중 대기 화면 움직이는 로고로 이용자의 기다림을 달랩니다.
   - 채팅창 내에서 이미지,동영상 전송 가능합니다.
   - 방에서 이탈하면 어떠한 정보도 저장하지않고 그대로 종료할 수 있습니다.

   - namespace와 room, join, leave 기능을 이용해서 우리의 매칭, 채팅 기능을 이용하기에 최적화했습니다.

<br />

***

## 트러블슈팅(Trouble Shooting)
<details>
<summary> 1. 장착된 토큰이 계속 해제되거나 만료되어 로그인 유지와 새 토큰교체가 원활히 이루어지지 않았습니다. </summary>
<div markdown="1">
  
    <br>
AXIOS에 내장된 인터셉터 함수로 request, response 별로 토큰을 우편처럼 붙여 적용.
|관련사항| 내용  |
|--------|----------|
|담당자| FE- 남해리 |
|도입이유 | 새 AccessToken을 받아 교체하거나 토큰을 받아 로그인 상태를 유지하기 위해 도입했습니다. |
|선택지 |  1. instance에서만 bearer + 토큰달고 request는 사용 안 해 보기로 했습니다. |
| |  2. instance와 request와 response값에 토큰을 붙여 config값과 내보내고 return하는 값은 일반 config, error값만 통째로 내보내기로 했습니다. |
|조율 |  코드를 줄이면 응답처리 소요시간이 줄어 좋지만 토큰도 유지되어야 한다고 생각했습니다.  |
|의견결정 | (첫번째 첨부사진)선택지 2로 결정했습니다. 첫번째로, 토큰이 해제 안 되고 계속 장착되어 로그인을 유지하기 위해 매번 request, response의  config, error처리에 토큰 항상  붙여 내보냅니다| |
|과정1 |  ![image](https://user-images.githubusercontent.com/76435572/207471825-d556e40d-e4bb-4cc8-95ab-aaacbfe75d54.png) |
|과정2 |   (두번째 첨부사진)두번째로, response값을 내보낼 때, 토큰을 적용하는 코드 외에 값을 별 과정없이 통째로 내보내는 코드(return config, return error.config, 토큰장착)로 유지해서 response값이 처리되는 과정이 느리지 않게 하기로 결정했습니다. |
|과정3 |   ![image](https://user-images.githubusercontent.com/76435572/207472009-0b153457-3f0b-4d22-a3bc-fd79bed6764b.png) |
  
</div>
</details>
<br />

***

## 고객 반응 및 개선사항
### 고객 반응 1- 회원가입 및 추가정보 부분
|관련사항| 내용  |
|--------|----------|
|담당자| FE- 남해리 |
|요구사항 1 |로그인, 회원가입 절차에서 적은 안내로 불편함이 많으셨습니다. |
|해결 및 개선 1 | 로그인과 회원가입 때 환승시민만의 회원으로 인증할 정보가 꼭 필요했기에 넣은 절차기에 고객을 설득할 수 있도록 페이지 상단에 회원가입이란 팻말에서 추가 정보로 변경 및 휴대폰 인증 동의서에 관한 약관 추가했습니다. 또한 회원가입 조건안내가 부족하여 입력란 아래 입력상황마다 조건을 볼 수 있도록 상황별 메세지 안내를 추가했습니다. |
|초안 1 |본래 focus되고 입력했을 때 안내 문구가 뜨게 했지만 |
|수정 1 |화면이 렌더링 됐을 때부터 안내가 분명하게 드러날 수 있게 했고 몇 공백과 언어에 상세한 안내도 추가했습니다. |
|수정 1 첨부 내용 |![image](https://user-images.githubusercontent.com/76435572/207478120-b451697f-f2c9-453a-a4cf-852dbf3b9a30.png) |
|수정 2|개인 정보 중 휴대폰 번호 수집에 관한 약관추가|
|수정 2 첨부 내용|![image](https://user-images.githubusercontent.com/76435572/207478210-4b79075d-1a68-468a-8401-e06e2337be11.png) |
|수정 3| 기존의 추가정보도 회원가입에 넣었던 초안에서 회원가입과 환승시민만의 추가정보 기입 인식에 도움되는 문구로 구별했습니다.|
|수정 3 첨부 내용| ![image](https://user-images.githubusercontent.com/76435572/207478423-f2ed859c-a2d1-470f-a51a-f242198c1ffa.png)|
| | ![image](https://user-images.githubusercontent.com/76435572/207478487-f192686c-67c7-4efa-b726-b10352085575.png)|

<br />

### 고객 반응 2- 추가정보 부분의 버튼 크기
|관련사항| 내용  |
|--------|----------|
|담당자| FE- 남해리 |
|요구사항 2 |버튼이 작아 불편함을 느끼셨습니다. |
|해결 및 개선 2  |버튼의 크기를 키우고 필수 요건임을 알리기 위한 안내문을 추가했습니다. ex) 크기 키우고 안내 추가. ⇒ 사진첨부, 사진첨부 필수.  |
|개선  2 |![image](https://user-images.githubusercontent.com/76435572/207478717-72f72df1-0ca0-4d1a-851f-36919eb4c7bd.png) |


***

## 폴더 구조
```text
team4-final-project
  ├── public
  │     └── favicon(홈페이지 파비콘)
  │     └── index.html
  │     └── logo192.png
  │     └── logo512.png
  ├── src
  │     └── Assets(페이지별 폴더로 나눠서 해당 이미지 파일 보관)
  │     └── Components(페이지별 상세페이지로 쓰인 컴포넌트 보관)
  │     └── Element(상세페이지 안의 필요한 컴포넌트들 보관)
  │     └── MyTools(페이지별로 쓰인 hooks보관)
  │     └── Pages(페이지별 코드)
  │     └── Shared(인스턴스, 인터셉터 및 페이지 라우팅설정 보관)
  │     └── App.js
  │     └── App.test.js
  │     └── index.css
  │     └── logo.svg
  │     └── reportWebVital.js
  │     └── setupTests.js
  │     
  └── .gitignore
  └── package.json (install해서 쓰는 패키지 및 라이브러리, 프레임워크 내역)
  └── postcss.config.js (테일윈드css를 원활히 쓰기 위한 설정 파일)
  └── prettierrc.js (띄어쓰기, 따옴표 설정으로 충돌 막기위한 설정 파일)
  └── README.md (프로젝트 설명 마크다운 파일)
  └── tailwind.config.js (테일윈드css를 원활히 쓰기 위한 묘듈 설정을 사용하는 파일)
  └── yarn.lock
       
```





