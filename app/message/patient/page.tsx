"use client";
import { useSendingMessage } from "@/src/hooks/chat/useChat";
import ChatSideBar from "./_patientChatContent/ChatSideBar";
import { useGetUser, UserType } from "@/src/hooks/serviceHook";
import ChatArea from "../_messageContent/ChatContainer";

export default function ChatInterface() {
  const {
    adjustTextareaHeight,
    setMessage,
    message,
    textareaRef,
    activeUsers,
    // isLoading,
    handleSendMessage,
    selectedChat,
    onEmojiClick,
    showMobileChat,
    handleSetSelectChat,
    messageEndRef,
    setShowMobileChat,
    messages
  } = useSendingMessage();
  const { data, isLoading: userLoading } = useGetUser();
  const currentUser = data?.data.user.user_id;

  // Add a loading state
  if (userLoading || !currentUser) {
    return <div>Loading...</div>;
  }

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
        onEmojiClick={onEmojiClick}
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
