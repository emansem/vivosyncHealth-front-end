"use client";
import { useSendingMessage } from "@/src/hooks/chat/useChat";
import ChatArea from "./_doctorChatContent/ChatArea";
import { UserType } from "@/src/hooks/serviceHook";
import ChatSideBar from "../patient/_patientChatContent/ChatSideBar";

export default function ChatInterface() {
  const {
    adjustTextareaHeight,
    setMessage,
    message,
    textareaRef,
    demoChats,
    activeUsers,
    isLoading,
    handleSendMessage,
    selectedChat,
    showMobileChat,
    messageEndRef,
    setShowMobileChat,
    handleSetSelectChat,
    messages
  } = useSendingMessage();

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-white rounded-lg shadow-sm">
      {/* Sidebar */}
      <ChatSideBar
        activeUsers={activeUsers as UserType[]}
        handleSetSelectChat={handleSetSelectChat}
        selectedChat={selectedChat}
        showMobileChat={showMobileChat}
      />
      {/* Chat area */}
      <ChatArea
        selectedChat={selectedChat}
        setMessage={setMessage}
        messages={messages}
        messageEndRef={messageEndRef}
        message={message}
        adjustTextareaHeight={adjustTextareaHeight}
        setShowMobileChat={setShowMobileChat}
        handleSendMessage={handleSendMessage}
        showMobileChat={showMobileChat}
        textareaRef={textareaRef}
      />
    </div>
  );
}
