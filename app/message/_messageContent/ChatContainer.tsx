import { Message } from "@/src/types/general";
import React, { ChangeEvent, LegacyRef } from "react";

import { UserType } from "@/src/hooks/serviceHook";
import { MessagesArea } from "./MessageContainer";
import { SendMessageInput } from "./MessageInputBox";
import ChatHeader from "./ChatHeader";
import { EmojiClickData } from "emoji-picker-react";
interface ChatAreaProps {
  setShowMobileChat: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChat: UserType | null;
  showMobileChat: boolean;
  currentUser: string;
  messages: Message[];
  handleSendMessage: () => void;
  onEmojiClick: (emojiData: EmojiClickData) => void;
  status: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  textareaRef: LegacyRef<HTMLTextAreaElement> | undefined;
  messageEndRef: LegacyRef<HTMLDivElement> | undefined;
  adjustTextareaHeight: () => void;
}

function ChatArea({
  selectedChat,
  setShowMobileChat,
  messages,
  textareaRef,
  adjustTextareaHeight,
  handleSendMessage,
  message,
  status,
  onEmojiClick,
  currentUser,
  setMessage,
  messageEndRef,
  showMobileChat
}: ChatAreaProps) {
  const handleOnChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <div
      className={`flex-1 flex flex-col ${
        !showMobileChat ? "hidden md:flex" : "flex"
      }`}
    >
      {selectedChat ? (
        <>
          {/* Chat header */}

          <ChatHeader
            status={status}
            selectedChat={selectedChat}
            setShowMobileChat={setShowMobileChat}
          />
          {/* messages area */}
          <MessagesArea
            currentUser={currentUser}
            messageEndRef={messageEndRef}
            messages={messages}
          />

          {/* Input area */}
          <SendMessageInput
            onEmojiClick={onEmojiClick}
            setMessage={setMessage}
            handleOnChangeMessage={handleOnChangeMessage}
            handleSendMessage={handleSendMessage}
            textareaRef={textareaRef}
            message={message}
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatArea;
