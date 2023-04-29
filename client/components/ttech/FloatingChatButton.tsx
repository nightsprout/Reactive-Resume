// FloatingChatButton.tsx
import { Chat } from '@mui/icons-material';
import React, { useState } from 'react';

import ChatWindow from './ChatWindow';

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 left-2 w-72 bg-opacity-100">
      {isOpen && <ChatWindow />}
      <button
        onClick={handleClick}
        className="rounded-full bg-[#E86431] bg-opacity-100 p-3 text-white shadow-lg focus:outline-none"
        style={{ backgroundColor: '#E86431' }}
      >
        <Chat />
      </button>
    </div>
  );
};

export default FloatingChatButton;
