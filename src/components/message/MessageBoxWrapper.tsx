"use client";
import React from "react";
import MessageSidBar from "./MessageSidBar";
import MessageBox from "./MessageBox";
import useMessage from "@/src/hooks/useMessage";

const MessageBoxStyle = {
  messageBoxWrapper: `flex  gap-10 h-[80vh] overflow-hidden  w-full items-start bg-white p-4 rounded-lg shadow-shadow1`,
  messageSideBar: `w-full flex-[0_0_100%] 
    md:flex-[0_0_350px]  md:block   px-3 rounded-lg custom-scrollbar shadow-shadow5 h-full  overflow-y-auto `,
  messageContainer: `flex-1  md:block custom-scrollbar relative bg-[#eeeeee] border h-full rounded-lg  shadow-shadow5 overflow-y-auto`
};

function MessageBoxWrapper() {
  const {
    openMessageContainer,
    handleOPenMessageSideBar,
    openMessageSideBar,
    closeMessageContainer
  } = useMessage();
  return (
    <div className={MessageBoxStyle.messageBoxWrapper}>
      <div
        className={`${MessageBoxStyle.messageSideBar} ${
          !openMessageSideBar && "hidden"
        }`}
      >
        <MessageSidBar getUserId={handleOPenMessageSideBar} />
      </div>
      <div
        className={`${MessageBoxStyle.messageContainer} ${
          openMessageContainer && "flex"
        }`}
      >
        <MessageBox closeMessageContainer={closeMessageContainer} />
      </div>
    </div>
  );
}

export default MessageBoxWrapper;
