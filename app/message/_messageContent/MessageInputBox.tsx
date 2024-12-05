import { PRIMARY_COLOR } from "@/app/lib/constant";
import { Paperclip, Smile, Image, Send } from "lucide-react";
import { ChangeEvent, LegacyRef } from "react";

interface SendMessageInputProps {
  handleSendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  handleOnChangeMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: LegacyRef<HTMLTextAreaElement> | undefined;
}

export const SendMessageInput = ({
  handleSendMessage,
  handleOnChangeMessage,
  message,
  textareaRef
}: SendMessageInputProps) => {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              handleOnChangeMessage(e);
            }}
            placeholder="Type a message..."
            className="block w-full resize-none px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary pr-24 overflow-hidden break-words"
            style={{ maxHeight: "150px", overflowWrap: "break-word" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Paperclip size={20} className="text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Image size={20} className="text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Smile size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="p-3 rounded-lg bg-primary text-white flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
