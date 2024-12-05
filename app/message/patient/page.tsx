"use client";
import {
  useGetActiveSubscription,
  useSendingMessage
} from "@/src/hooks/chat/useChat";
import ChatArea from "./_patientChatContent/ChatArea";
import ChatSideBar from "./_patientChatContent/ChatSideBar";
import { useGetUser, UserType } from "@/src/hooks/serviceHook";

export default function ChatInterface() {
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
    handleSetSelectChat,
    messageEndRef,
    setShowMobileChat,
    messages
  } = useSendingMessage();
  const { data } = useGetUser();
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
