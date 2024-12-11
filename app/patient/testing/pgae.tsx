"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Video,
  Phone,
  Send,
  Search,
  Menu,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  X,
  Smile,
  Check,
  CheckCheck
} from "lucide-react";

// Utils
const formatMessageTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatLastMessageTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";

  return formatMessageTime(date);
};

interface Chat {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  lastMessage?: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "online" | "offline" | "away";
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  status: "sent" | "delivered" | "read";
}

const ChatLayout: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const chats: Chat[] = [
    {
      id: "1",
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      avatar: "/api/placeholder/48/48",
      lastMessage: "I've reviewed your latest reports...",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      status: "online"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      avatar: "/api/placeholder/48/48",
      lastMessage: "Your test results look good...",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      unreadCount: 0,
      status: "offline"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      content: "Good morning! How are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderId: "other",
      status: "read"
    },
    {
      id: "2",
      content: "I'm feeling much better, thank you doctor.",
      timestamp: new Date(Date.now() - 1000 * 60 * 29),
      senderId: "me",
      status: "read"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
    scrollToBottom();
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="h-screen w-full grid md:grid-cols-[400px_1fr] bg-white">
      {/* Sidebar - Fixed width on desktop, sliding on mobile */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-20 
          w-full md:w-[400px] md:flex md:flex-col
          bg-white border-r transform transition-transform duration-200
          ${
            isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Fixed Header */}
        <div className="absolute inset-x-0 top-0 z-10 bg-white border-b">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover border-2 border-gray-100"
                  />
                  <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">Messages</h1>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-full text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#269c65]/20 transition-all
                  placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Scrollable Chat List */}
        <div className="absolute inset-x-0 top-[132px] bottom-0 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.id);
                setMobileSidebarOpen(false);
              }}
              className={`
                p-4 flex items-center gap-3 cursor-pointer border-b
                transition-colors duration-150
                ${selectedChat === chat.id ? "bg-gray-50" : "hover:bg-gray-50"}
              `}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <span
                  className={`
                    absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white
                    ${chat.status === "online" ? "bg-green-500" : "bg-gray-400"}
                  `}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900 truncate pr-2">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatLastMessageTime(chat.lastMessageTime)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-600 truncate pr-2">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="flex-shrink-0 bg-[#269c65] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="relative flex flex-col h-screen w-full bg-gray-50">
        {selectedChat ? (
          <>
            {/* Fixed Header */}
            <div className="absolute inset-x-0 top-0 z-10 bg-white border-b">
              <div className="h-16 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setMobileSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="/api/placeholder/48/48"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>
                    <div>
                      <h2 className="font-medium text-gray-900">
                        Dr. Sarah Smith
                      </h2>
                      <p className="text-sm text-[#269c65]">Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="absolute inset-x-0 top-16 bottom-[76px] overflow-y-auto">
              <div className="p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* For received messages, show avatar */}
                    {msg.senderId !== "me" && (
                      <img
                        src="/api/placeholder/32/32"
                        alt=""
                        className="w-8 h-8 rounded-full mr-2 self-end mb-1"
                      />
                    )}

                    <div
                      className={`
                        group relative max-w-[75%] px-4 py-2 rounded-[20px]
                        ${
                          msg.senderId === "me"
                            ? "bg-[#269c65] text-white rounded-tr-sm ml-12"
                            : "bg-white text-gray-900 rounded-tl-sm shadow-sm"
                        }
                      `}
                    >
                      <p className="text-[15px] leading-relaxed">
                        {msg.content}
                      </p>
                      <div
                        className={`
                          flex items-center gap-1 text-xs mt-1
                          ${
                            msg.senderId === "me"
                              ? "text-green-100"
                              : "text-gray-500"
                          }
                        `}
                      >
                        {formatMessageTime(msg.timestamp)}
                        {msg.senderId === "me" && (
                          <span>
                            {msg.status === "sent" && (
                              <Check className="w-3 h-3" />
                            )}
                            {msg.status === "delivered" && (
                              <CheckCheck className="w-3 h-3" />
                            )}
                            {msg.status === "read" && (
                              <CheckCheck className="w-3 h-3 text-blue-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Fixed Input Area */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-white border-t">
              <div className="p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1 flex items-end bg-gray-100 rounded-2xl">
                    <button className="p-3 hover:bg-gray-200 rounded-xl transition-colors">
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      rows={1}
                      className="flex-1 py-3 px-2 bg-transparent resize-none focus:outline-none min-h-[45px] max-h-[150px]"
                    />
                    <div className="flex items-center pr-2 gap-1">
                      <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                        <ImageIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-[#269c65] hover:bg-[#269c65]/90 text-white rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-medium mb-2">Welcome to Messages</h2>
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatLayout;
