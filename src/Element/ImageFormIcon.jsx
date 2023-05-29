import React from 'react';
import { ReactComponent as ImageFormHandler } from '../Assets/Chatting/ImageForm.svg';
const ImageFormIcon = ({ inputRef }) => {
  const formHandler = () => {
    inputRef.current.click();
  };
  return (
    <>
      <ImageFormHandler
        onClick={formHandler}
        style={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          marginLeft: '16px',
        }}
      />
    </>
  );
};

export default ImageFormIcon;
