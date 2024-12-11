"use client";
import React, { useState } from "react";
import {
  Send,
  Sparkles,
  Clock,
  PlusCircle,
  Loader,
  Menu,
  X
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
}

const AiAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample suggested prompts
  const suggestedPrompts = [
    {
      title: "Analyze Patient Symptoms",
      description: "Help me analyze these symptoms...",
      icon: "🏥"
    },
    {
      title: "Treatment Review",
      description: "Review this treatment plan...",
      icon: "📋"
    },
    {
      title: "Drug Interactions",
      description: "Check interactions between...",
      icon: "💊"
    }
  ];

  // Sample chat history
  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Patient Case Review",
      lastMessage: "The recommended treatment plan for...",
      timestamp: new Date("2024-03-15T10:30:00"),
      unread: true
    },
    {
      id: "2",
      title: "Medication Analysis",
      lastMessage: "Based on the patient's history...",
      timestamp: new Date("2024-03-14T15:45:00")
    },
    {
      id: "3",
      title: "Lab Results Discussion",
      lastMessage: "The blood test results indicate...",
      timestamp: new Date("2024-03-13T09:15:00")
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated AI response. In the real implementation, this would be connected to your AI backend.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // Format the timestamp
  const formatTime = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - Hidden on mobile by default */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 bg-white border-r border-gray-200 z-30`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4">
            <button
              className="w-full bg-primary_color text-white rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={() => {
                setMessages([]);
                setIsSidebarOpen(false);
              }}
            >
              <PlusCircle className="h-5 w-5" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 mb-2 flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Recent Chats
            </div>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium truncate">
                          {chat.title}
                        </span>
                        {chat.unread && (
                          <span className="w-2 h-2 bg-primary_color rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <h1 className="font-semibold">AI Assistant</h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            // Empty State
            <div className="h-full flex flex-col items-center justify-center p-6">
              <div className="bg-primary_color bg-opacity-10 p-3 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-primary_color" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-center">
                Medical AI Assistant
              </h1>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                Get instant help with patient cases, medical research, and
                clinical decisions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl px-4">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-200 text-left flex items-start space-x-3"
                    onClick={() => setInputMessage(prompt.description)}
                  >
                    <span className="text-2xl">{prompt.icon}</span>
                    <div>
                      <div className="font-medium">{prompt.title}</div>
                      <div className="text-sm text-gray-600 truncate">
                        {prompt.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages
            <div className="p-4 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary_color text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <Loader className="h-5 w-5 animate-spin text-primary_color" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary_color text-white p-3 rounded-lg hover:opacity-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AiAssistantPage;
