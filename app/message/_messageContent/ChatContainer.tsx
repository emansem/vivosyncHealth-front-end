import { Chat, Message } from "@/src/types/general";
import React, { ChangeEvent, LegacyRef } from "react";

import { useGetUser, UserType } from "@/src/hooks/serviceHook";
import { MessagesArea } from "./MessageContainer";
import { SendMessageInput } from "./MessageInputBox";
import ChatHeader from "./ChatHeader";
interface ChatAreaProps {
  setShowMobileChat: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChat: UserType | null;
  showMobileChat: boolean;
  currentUser: string;
  messages: Message[];
  handleSendMessage: () => void;
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
  currentUser,
  setMessage,
  messageEndRef,
  showMobileChat
}: ChatAreaProps) {
  const handleOnChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };
  const { data } = useGetUser();
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
