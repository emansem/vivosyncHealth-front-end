"use client";
import React, { useState, FormEvent } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Image,
  Menu
} from "lucide-react";

// Types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
}

const DoctorChat = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock messages
  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "1", // doctor
      text: "Good morning! I've reviewed your latest blood test results.",
      timestamp: "9:30 AM",
      status: "read"
    },
    {
      id: "2",
      senderId: "user",
      text: "Good morning Dr. Wilson! Thank you for checking. How do they look?",
      timestamp: "9:31 AM",
      status: "read"
    },
    {
      id: "3",
      senderId: "1",
      text: "Overall, they're looking good. Your cholesterol levels have improved since last time. I've attached the detailed report for your reference.",
      timestamp: "9:32 AM",
      status: "read",
      attachments: [
        {
          type: "file",
          url: "#",
          name: "blood_test_results.pdf"
        }
      ]
    },
    {
      id: "4",
      senderId: "user",
      text: "That's great news! The diet changes must be working.",
      timestamp: "9:33 AM",
      status: "read"
    },
    {
      id: "5",
      senderId: "1",
      text: "Yes, the improvements are significant. I've prepared a graph showing your progress over the last 3 months.",
      timestamp: "9:34 AM",
      status: "read",
      attachments: [
        {
          type: "image",
          url: "/api/placeholder/400/300",
          name: "cholesterol_progress.png"
        }
      ]
    },
    {
      id: "6",
      senderId: "1",
      text: "Would you like to schedule a follow-up appointment to discuss this in detail?",
      timestamp: "9:34 AM",
      status: "delivered"
    },
    {
      id: "7",
      senderId: "user",
      text: "Yes, that would be great. When are you available next week?",
      timestamp: "9:35 AM",
      status: "sent"
    }
  ];

  // Mock doctors data
  const mockDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      avatar: "/api/placeholder/48/48",
      status: "online",
      lastMessage: {
        text: "Your test results look promising...",
        timestamp: "10:30 AM",
        isRead: true
      }
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      avatar: "/api/placeholder/48/48",
      status: "busy",
      lastMessage: {
        text: `'Let's discuss your MRI results`,
        timestamp: "9:15 AM",
        isRead: false
      }
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialty: "Pediatrician",
      avatar: "/api/placeholder/48/48",
      status: "offline",
      lastMessage: {
        text: "Remember to take the prescribed...",
        timestamp: "Yesterday",
        isRead: true
      }
    }
  ];

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: String(Date.now()),
        senderId: "user",
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        status: "sent"
      };
      setMessages([...messages, newMessage]);

      // Simulate doctor's reply after 1 second
      setTimeout(() => {
        const doctorReply: Message = {
          id: String(Date.now() + 1),
          senderId: selectedDoctor?.id || "1",
          text: "I'll check my schedule and get back to you with available slots.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          status: "sent"
        };
        setMessages((prev) => [...prev, doctorReply]);
      }, 1000);
    }
  };

  // Message status icon component
  const MessageStatus = ({ status }: { status: Message["status"] }) => {
    return (
      <span className="text-xs text-gray-500">
        {status === "sent" && "✓"}
        {status === "delivered" && "✓✓"}
        {status === "read" && <span className="text-blue-500">✓✓</span>}
      </span>
    );
  };

  // Doctors List Component
  const DoctorsList = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Doctors</h2>
        <div className="mt-2 relative">
          <input
            type="search"
            placeholder="Search doctors..."
            className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => {
              setSelectedDoctor(doctor);
              setMessages(mockMessages); // Load mock messages when selecting a doctor
              setIsMobileMenuOpen(false);
            }}
            className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors
              ${selectedDoctor?.id === doctor.id ? "bg-blue-50" : ""}`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${
                      doctor.status === "online"
                        ? "bg-green-500"
                        : doctor.status === "busy"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  <span className="text-xs text-gray-500">
                    {doctor.lastMessage.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {doctor.lastMessage.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Chat Header Component
  const ChatHeader = ({ doctor }: { doctor: Doctor }) => (
    <div className="px-6 py-4 border-b border-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                ${
                  doctor.status === "online"
                    ? "bg-green-500"
                    : doctor.status === "busy"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => console.log("Voice call")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => console.log("Video call")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  // Message Input Component
  const MessageInput = () => (
    <div className="px-6 py-4 border-t border-gray-100 bg-white">
      <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            rows={4}
          />
          <div className="absolute bottom-3 right-3 flex space-x-2">
            <button
              type="button"
              onClick={() => console.log("Attach file")}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <button
              type="button"
              onClick={() => console.log("Attach image")}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Image className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Doctors sidebar */}
      <div
        className={`w-96 bg-white border-r border-gray-100 flex-shrink-0
          ${
            isMobileMenuOpen ? "fixed inset-y-0 left-0 z-40" : "hidden md:block"
          }`}
      >
        <DoctorsList />
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedDoctor ? (
          <>
            <ChatHeader doctor={selectedDoctor} />
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex ${
                        msg.senderId === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      } items-end space-x-2 max-w-[80%] ${
                        msg.senderId === "user" ? "space-x-reverse" : ""
                      }`}
                    >
                      {msg.senderId !== "user" && selectedDoctor && (
                        <img
                          src={selectedDoctor.avatar}
                          alt={selectedDoctor.name}
                          className="w-8 h-8 rounded-full mb-1"
                        />
                      )}
                      <div
                        className={`flex flex-col ${
                          msg.senderId === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.senderId === "user"
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          {msg.attachments?.map((attachment, index) => (
                            <div key={index} className="mt-2">
                              {attachment.type === "image" ? (
                                <div className="rounded-lg overflow-hidden">
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    className="w-full h-auto"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg p-2">
                                  <Paperclip className="w-4 h-4" />
                                  <span className="text-sm">
                                    {attachment.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {msg.timestamp}
                          </span>
                          {msg.senderId === "user" && (
                            <MessageStatus status={msg.status} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-700">
                Select a doctor to start chatting
              </h3>
              <p className="mt-2 text-gray-500">
                Choose from your list of doctors on the left
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DoctorChat;
