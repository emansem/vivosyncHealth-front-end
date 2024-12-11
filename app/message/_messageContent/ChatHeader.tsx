import { UserType } from "@/src/hooks/serviceHook";
import { X, Phone, Video, MoreVertical } from "lucide-react";

interface ChatHeaderProps {
  setShowMobileChat: (isOpen: boolean) => void;
  selectedChat: UserType | null;
  status: string;
}

function ChatHeader({
  selectedChat,
  status,
  setShowMobileChat
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0">
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setShowMobileChat(false)}>
          <X size={24} />
        </button>
        <div className="relative">
          <img
            src={selectedChat?.profile_photo}
            alt={selectedChat?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                      ${status === "online" ? "bg-green-500" : "bg-gray-400"}`}
          />
        </div>
        <div>
          <h2 className="font-medium">{selectedChat?.name}</h2>
          <p className="text-sm flex gap-1 item-center text-gray-500">
            <span>{selectedChat?.speciality}</span>

            <span
              className={` ${
                status === "online" ? "text-secondary_color" : "text-gray-400"
              } font-medium`}
            >
              {status === "online" ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Phone size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
