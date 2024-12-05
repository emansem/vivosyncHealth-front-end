import { Chat, Message } from "@/src/types/general";
import ChatHeader from "./ChatHeader";
import React, { ChangeEvent, LegacyRef } from "react";
import { PRIMARY_COLOR } from "@/app/lib/constant";
import { formatDateIntl, formatTime } from "@/src/helper/helper";
import { Paperclip, Smile, Send, Image } from "lucide-react";
import { UserType } from "@/src/hooks/serviceHook";
interface ChatAreaProps {
  setShowMobileChat: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChat: UserType | null;
  showMobileChat: boolean;
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
            selectedChat={selectedChat}
            setShowMobileChat={setShowMobileChat}
          />
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden">
            {messages.map((msg, index) => {
              // Check if we should show the date
              const showDate =
                index === 0 ||
                new Date(messages[index - 1].timestamp).toDateString() !==
                  new Date(msg.timestamp).toDateString();

              return (
                <React.Fragment key={msg.id}>
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-500">
                        {formatDateIntl(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      msg.senderId === "current-user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-1 ${
                        msg.senderId === "current-user"
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <div
                        className={`flex items-end gap-2 ${
                          msg.senderId === "current-user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <div
                          className={`relative max-w-[280px] md:max-w-[420px] min-w-[60px] rounded-lg px-3 py-2 break-words whitespace-pre-wrap overflow-hidden ${
                            msg.senderId === "current-user"
                              ? "bg-primary text-white"
                              : "bg-gray-100"
                          }`}
                          style={{
                            backgroundColor:
                              msg.senderId === "current-user"
                                ? PRIMARY_COLOR
                                : undefined
                          }}
                        >
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                      <div className="text-[11px] px-2 text-gray-500">
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messageEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => {
                    handleOnChangeMessage(e);
                  }}
                  placeholder="Type a message..."
                  className="block w-full resize-none px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary pr-24 overflow-hidden break-words"
                  style={{ maxHeight: "150px", overflowWrap: "break-word" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Paperclip size={20} className="text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Image size={20} className="text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Smile size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-3 rounded-lg bg-primary text-white flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
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
