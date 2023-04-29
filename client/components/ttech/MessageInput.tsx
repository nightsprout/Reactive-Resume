import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  defaultText: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, defaultText = '' }) => {
  const [input, setInput] = useState(defaultText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-72 items-center rounded-lg ">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-1 w-72 rounded-lg border px-4 py-2 text-black focus:border-blue-300 focus:outline-none focus:ring"
        placeholder="Type your message..."
        maxLength={3000}
        autoComplete="off"
      />

      {/* <button type="submit" className="rounded-lg bg-blue-500 px-4 py-2 text-white">
        Send
      </button> */}
    </form>
  );
};

export default MessageInput;
