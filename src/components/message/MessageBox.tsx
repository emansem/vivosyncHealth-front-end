"use client";

import React, { useState } from "react";

import MessageBoxHeader from "./MessageBoxHeader";
import { MessageBoxProps } from "@/src/types/messageTypes";
import MessageBoxBody from "./MessageBoxBody";
import MessageBoxFooter from "./MessageBoxFooter";
function MessageBox({ closeMessageContainer }: MessageBoxProps) {
  return (
    <div className="relative h-full flex flex-col custom-scrollbar">
      <div className="sticky flex-shrink-0 top-0 z-10 border-b px-3  bg-white ">
        <div className="py-4">
          <MessageBoxHeader closeMessageContainer={closeMessageContainer} />
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-1 px-3 ">
        <div className="py-6">
          <MessageBoxBody />
        </div>
      </div>
      <div className="sticky bottom-0 flex-shrink-0 px-3  border-t-2 w-full bg-white py-2 ">
        <div className="py-2">
          <MessageBoxFooter />
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
