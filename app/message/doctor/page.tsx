"use client";
import { useSendingMessage } from "@/src/hooks/chat/useChat";
import ChatArea from "./_doctorChatContent/ChatArea";
import ChatSideBar from "./_doctorChatContent/ChatSideBar";

export default function ChatInterface() {
  const {
    adjustTextareaHeight,
    setMessage,
    message,
    textareaRef,
    demoChats,
    handleSendMessage,
    selectedChat,
    showMobileChat,
    messageEndRef,
    setShowMobileChat,
    setSelectedChat,
    messages
  } = useSendingMessage();
  return (
    <div className="flex h-[calc(100vh-5rem)] bg-white rounded-lg shadow-sm">
      {/* Sidebar */}
      <ChatSideBar
        demoChats={demoChats}
        setSelectedChat={setSelectedChat}
        setShowMobileChat={setShowMobileChat}
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
