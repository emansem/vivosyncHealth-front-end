"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  Send,
  Image as ImageIcon,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video
} from "lucide-react";

// Types
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: "me" | "other";
  status: "sent" | "delivered" | "read";
  senderName: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  online: boolean;
  typing?: boolean;
}

// Mock Data
const demoChats: Chat[] = [
  {
    id: "1",
    name: "Dr. Sarah Williams",
    avatar: "/api/placeholder/50/50",
    lastMessage: "I'll review your test results and get back to you shortly.",
    timestamp: new Date(),
    unreadCount: 3,
    online: true
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    avatar: "/api/placeholder/50/50",
    lastMessage: "Your blood pressure readings look normal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 0,
    online: true
  },
  {
    id: "3",
    name: "Dr. Emily Parker",
    avatar: "/api/placeholder/50/50",
    lastMessage: "Remember to take your medication twice daily.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    unreadCount: 1,
    online: false
  }
  // Add more chats...
];

const demoMessages: Message[] = [
  {
    id: "1",
    content: "Good morning! How are you feeling today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    senderId: "other",
    status: "read",
    senderName: "Dr. Sarah"
  },
  {
    id: "2",
    content:
      "Hi Doctor, I'm feeling much better since starting the new medication. The fever has gone down significantly.",
    timestamp: new Date(Date.now() - 1000 * 60 * 59),
    senderId: "me",
    status: "read",
    senderName: "Me"
  },
  {
    id: "3",
    content: "That's great to hear! Any side effects?",
    timestamp: new Date(Date.now() - 1000 * 60 * 58),
    senderId: "other",
    status: "read",
    senderName: "Dr. Sarah"
  },
  {
    id: "4",
    content:
      "Just mild drowsiness in the first couple of hours after taking it, but it's manageable.",
    timestamp: new Date(Date.now() - 1000 * 60 * 57),
    senderId: "me",
    status: "read",
    senderName: "Me"
  },
  {
    id: "5",
    content:
      "That's a common side effect and should decrease over time. Keep monitoring and let me know if it persists or worsens.",
    timestamp: new Date(Date.now() - 1000 * 60 * 56),
    senderId: "other",
    status: "read",
    senderName: "Dr. Sarah"
  }
  // Add more messages...
];

// Utils
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;

  return date.toLocaleDateString();
};

const ChatLayout: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 100) + "px";
    }
  }, [inputMessage]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: new Date(),
      senderId: "me",
      status: "sent",
      senderName: "Me"
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Auto reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside
        className={`
        w-full md:w-[320px] bg-white border-r border-gray-200
        ${showSidebar ? "flex" : "hidden md:flex"}
        flex-col fixed md:relative h-full z-30
      `}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-lg text-gray-700
                placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {demoChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.id);
                setShowSidebar(false);
              }}
              className={`
                flex items-center px-3 py-2 cursor-pointer
                ${selectedChat === chat.id ? "bg-blue-50" : "hover:bg-gray-50"}
                border-b border-gray-100
              `}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                    rounded-full border-2 border-white"
                  />
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatMessageTime(chat.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {chat.typing ? "typing..." : chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col relative bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div
              className="h-[60px] px-4 flex items-center justify-between 
              bg-white border-b border-gray-200 sticky top-0"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center">
                  <img
                    src="/api/placeholder/40/40"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h2 className="font-medium">Dr. Sarah Williams</h2>
                    <p className="text-xs text-green-500">online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        relative group max-w-[85%] px-4 py-2 rounded-[18px]
                        ${
                          msg.senderId === "me"
                            ? "bg-[#0084ff] text-white rounded-br-sm"
                            : "bg-[#f0f0f0] text-gray-900 rounded-bl-sm"
                        }
                      `}
                    >
                      <p className="text-[15px] leading-relaxed">
                        {msg.content}
                      </p>
                      <div
                        className={`
                        flex items-center gap-1 mt-1 text-xs
                        ${
                          msg.senderId === "me"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }
                      `}
                      >
                        {formatTime(msg.timestamp)}
                        {msg.senderId === "me" && (
                          <span className="ml-1">
                            {msg.status === "sent" && "✓"}
                            {msg.status === "delivered" && "✓✓"}
                            {msg.status === "read" && (
                              <span className="text-white">✓✓</span>
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

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end bg-gray-100 rounded-full overflow-hidden">
                  <button className="p-3 hover:bg-gray-200">
                    <Smile className="w-6 h-6 text-gray-500" />
                  </button>
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Write a message..."
                    className="flex-1 px-4 py-3 bg-transparent resize-none text-[15px] 
                      text-gray-700 placeholder-gray-500 focus:outline-none min-h-[24px]"
                    style={{ maxHeight: "100px" }}
                  />
                  <div className="flex pr-3">
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                      <Paperclip className="w-6 h-6 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                      <ImageIcon className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-medium mb-2">
                Select a chat to start messaging
              </h2>
              <p>Choose from your existing conversations</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatLayout;
