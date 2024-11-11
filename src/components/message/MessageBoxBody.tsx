import { demoMessages } from "@/data/chatData";

const DOCTOR_ID = "d123";
const MessageBoxBody = ({ currentUser = DOCTOR_ID }) => {
  return (
    <>
      {demoMessages.map((message, index) => (
        <div
          key={index}
          className={` flex ${
            message.senderId === currentUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              message.senderId === currentUser
                ? "bg-light_color"
                : "bg-white shadow-shadow3"
            } w-[90%] md:max-w-[80%] p-3 mb-6 rounded-2xl`}
          >
            <p className="text-base"> {message.content}</p>
            <div>
              <p className="text-sm text-text_color2 mt-1">
                {message.timestamp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageBoxBody;
