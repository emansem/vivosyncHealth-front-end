import { Send } from "lucide-react";
import { useState } from "react";

const MessageBoxFooter = () => {
  const [message, setMessage] = useState("hello");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // const textArea = e.target;
    // textArea.style.height = "auto";
    // textArea.style.height = `${textArea.scrollHeight}`;
  };

  return (
    <div className="flex items-center gap-3 relative">
      <div className="w-full flex-1 ">
        <textarea
          onChange={handleChange}
          autoCorrect="false"
          value={message}
          autoFocus
          className="w-full shadow-shadow5 px-14 py-4 rounded-full h-10 md:h-12 min-h-6 overflow-hidden resize-none bg-gray-50 outline-none"
        />
      </div>

      <div className="cursor-pointer -ml-12 pr-3">
        <Send size={24} color=" #269c65" />
      </div>
    </div>
  );
};

export default MessageBoxFooter;
