import React from 'react';
import { ReactComponent as ExitIconItem } from '../Assets/Chatting/Exit.svg';

const ExitIcon = ({ isModal, setIsModal }) => {
  return (
    <div>
      <ExitIconItem
        onClick={() => setIsModal(!isModal)}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          right: '10px',
          top: '5px',
        }}
      />
    </div>
  );
};

export default ExitIcon;
