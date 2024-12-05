import { PRIMARY_COLOR, SECONDARY_COLOR } from "@/app/lib/constant";
import { UserType } from "@/src/hooks/serviceHook";
import { Chat } from "@/src/types/general";
import { Search } from "lucide-react";
import React from "react";
interface ChatSideBarProps {
  showMobileChat: boolean;
  activeUsers: UserType[];
  // demoChats: Chat[];
  handleSetSelectChat: (user: UserType | null) => void;
  selectedChat: UserType | null;
}

function ChatSideBar({
  showMobileChat,
  activeUsers,
  selectedChat,
  handleSetSelectChat
}: ChatSideBarProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-full md:w-[420px] border-r border-gray-200 flex-shrink-0 
        ${showMobileChat ? "hidden md:flex" : "flex"} flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              style={{ borderColor: PRIMARY_COLOR }}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {activeUsers?.map((user) => (
            <div
              key={user.user_id}
              onClick={() => handleSetSelectChat(user)}
              className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100
                ${
                  selectedChat?.user_id === user.user_id ? "bg-secondary" : ""
                }`}
              style={{
                backgroundColor:
                  selectedChat?.user_id === user.user_id
                    ? SECONDARY_COLOR
                    : undefined
              }}
            >
              <div className="relative">
                <img
                  src={user.profile_photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${
                      chat.participants[0].status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                /> */}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate">{user.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {/* {chat.lastMessage && formatTime(chat.lastMessage.timestamp)} */}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  {/* {chat.participants[0].specialty} */}
                  nothing
                </p>
                {/* {chat.lastMessage && ( */}
                <p className="text-sm text-gray-500 truncate">
                  {/* {chat.lastMessage.content} */}
                  just last message sent..
                </p>
                {/* )} */}
              </div>
              {/* {chat.unreadCount > 0 && ( */}
              <span
                className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-full"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {/* {chat.unreadCount} */}
                20
              </span>
              {/* )} */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatSideBar;
