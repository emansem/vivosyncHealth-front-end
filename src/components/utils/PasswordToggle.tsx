import { Eye, EyeOff } from "lucide-react";
import { MouseEventHandler } from "react";
interface TogglePassword {
  onClick: () => void;
  isVisable: Boolean;
}
export const TogglePassword = ({ onClick, isVisable }: TogglePassword) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-6  text-3xl right-4 cursor-pointer  "
    >
      {isVisable ? <EyeOff size={20} /> : <Eye size={20} />}
    </div>
  );
};
