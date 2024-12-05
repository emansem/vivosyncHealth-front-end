import { PRIMARY_COLOR } from "@/app/lib/constant";
import { Message } from "@/src/types/general";
import React from "react";
import { LegacyRef } from "react";

interface MessagesAreaProps {
  messageEndRef: LegacyRef<HTMLDivElement> | undefined;
  messages: Message[];
  currentUser: string;
}

export const MessagesArea = ({
  messages,
  currentUser,
  messageEndRef
}: MessagesAreaProps) => {
  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden">
        {messages.map((msg, index) => {
          return (
            <React.Fragment key={msg.id}>
              <div
                className={`flex ${
                  msg.sender_id === currentUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col gap-1 ${
                    msg.sender_id === currentUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      msg.sender_id === currentUser
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div
                      className={`relative max-w-[280px] md:max-w-[420px] min-w-[60px] rounded-lg px-3 py-2 break-words whitespace-pre-wrap overflow-hidden ${
                        msg.sender_id === currentUser
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                      style={{
                        backgroundColor:
                          msg.sender_id === currentUser
                            ? PRIMARY_COLOR
                            : undefined
                      }}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                  <div className="text-[11px] px-2 text-gray-500">
                    {/* {formatTime(msg.timestamp)} */}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messageEndRef} />
      </div>
    </>
  );
};
