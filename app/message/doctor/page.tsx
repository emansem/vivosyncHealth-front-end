"use client";
import { useSendingMessage } from "@/src/hooks/chat/useChat";
import { useGetUser, UserType } from "@/src/hooks/serviceHook";
import ChatSideBar from "../patient/_patientChatContent/ChatSideBar";
import ChatArea from "../patient/_patientChatContent/ChatArea";

export default function ChatInterface() {
  const { data } = useGetUser();
  const {
    adjustTextareaHeight,
    setMessage,
    message,
    textareaRef,
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
  const currentUser = data?.data.user.user_id;

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
        currentUser={currentUser as string}
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
