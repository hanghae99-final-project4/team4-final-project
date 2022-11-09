import axios from "axios";
import React, { useCallback, useRef } from "react";

//섬네일
// const SignUpthumbnail = () => {
//     const inputRef = useRef < HTMLInputElement> | (null  null);

//   //   const onUploadImage = useCallback(
//   //     (e: React.ChangeEvent<HTMLInputElement>) => {
//   //       if (!e.target.files) {
//   //         return;
//   //       }
//   //       console.log(e.target.files[0].name);
//   //     },
//   //     []
//   //   );

//   const onUploadImageImageBtn = useCallback(() => {
//     if (!inputRef.current) {
//       return;
//     }
//     inputRef.current.click();
//   }, []);

//   return (
//     <>
//       <input
//         type="file"
//         name="thumbnail"
//         ref={inputRef}
//         onChange={onUploadImage}
//       />
//       <button label="이미지없로드" onClick={onUploadImageImageBtn} />
//     </>
//   );
// };

//회원가입
const SignUp = () => {
  return (
    <>
      <div>
        <div>
          <p>사진첨부</p>
          {/* label을 클릭해서 input 요소 자체에 초점을 맞추거나 활성화 */}
          {/* label을 input 요소와 연관시키려면 input에 id 속성을 넣고
                  label에 id와 같은 값의 for 속성을 넣어야 해. */}
          {/* react같은 경우 "htmlFor"속성으로 넣어줘야 해 */}
          {/* label 안에 input을 중첩시킬 때 연관이 암시적이므로 
                  for, id속성이 필요없어 */}
          {/* label이 button과 중처될 경우 input과 lingking이 되지 않음. */}

          {/* <SignUpthumbnail /> */}
          <input
            type="file"
            name="thumbnail"
            // ref={inputRef}
            // onChange={onUploadImage}
          />
          <button
            label="이미지없로드"
            //   onClick={onUploadImageImageBtn}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
