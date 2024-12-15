import { Loader2 } from "lucide-react";

export const InnerPageLoader = () => {
  return (
    <div className="flex  flex-col justify-center gap-1 items-center">
      <Loader2 className="text-4xl text-secondary_color font-bold animate-spin" />
      <span className="text-center text-text_color2 font-medium text-lg">
        Loading..
      </span>
    </div>
  );
};
