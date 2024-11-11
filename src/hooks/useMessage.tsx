"use client";
import { useState } from "react";

function useMessage() {
  const [openMessageSideBar, setOpenMessageSideBar] = useState(true);
  const [openMessageContainer, setOPenMessageConatiner] = useState(false);

  const handleOPenMessageSideBar = (id: number) => {
    if (id && !isNaN(id)) {
      setOPenMessageConatiner(true);
      setOpenMessageSideBar(false);
    }
    return id;
  };
  const closeMessageContainer = () => {
    setOPenMessageConatiner(false);
    setOpenMessageSideBar(true);
  };

  return {
    openMessageSideBar,
    openMessageContainer,
    handleOPenMessageSideBar,
    closeMessageContainer
  };
}

export default useMessage;
