import { MessageBoxProps } from "@/src/types/messageTypes";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
const MessageBoxHeader = ({ closeMessageContainer }: MessageBoxProps) => {
  return (
    <div className="flex items-center gap-4">
      <div onClick={closeMessageContainer} className="md:hidden cursor-pointer">
        <ArrowLeft size={20} color="#269c65" />
      </div>
      <div className="relative cursor-pointer bg-primary_color w-12 h-12 min-h-12 min-w-12  md:w-12 md:h-12 rounded-full overflow-hidden  ">
        <Image
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Dr eman sem"
          fill
          sizes="70px"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-medium text-stone-700 cursor-pointer">
          Eman sem{" "}
        </h2>
        <p className="text-sm text-text_color2">Last seen 12.30 PM</p>
      </div>
    </div>
  );
};
export default MessageBoxHeader;
