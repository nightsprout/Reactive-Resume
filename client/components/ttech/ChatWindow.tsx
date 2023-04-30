import { Configuration, OpenAIApi } from 'openai';
import React, { useEffect, useRef, useState } from 'react';

import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

interface IMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

const ChatWindow: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (content: string) => {
    const newUserMessage: IMessage = { role: 'user', content: content };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setLoading(true);

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [...messages, newUserMessage],
      });
      const response = completion?.data?.choices?.[0]?.message?.content ?? '';
      setLoading(false);
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error while sending message:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-72 items-start justify-center rounded-lg bg-transparent">
      <div>
        <div style={{ maxHeight: 500 }} className="overflow-y-auto">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} content={msg.content} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={messagesEndRef}></div>
        </div>
        <MessageInput onSend={sendMessage} defaultText="" />
      </div>
    </div>
  );
};

export default ChatWindow;
