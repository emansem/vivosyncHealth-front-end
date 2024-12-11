import { LoaderCircle } from "lucide-react";
import React from "react";
interface SubmittingLoaderProps {
  text?: string;
}

function SubmittingLoader({ text }: SubmittingLoaderProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <LoaderCircle size={24} className="animate-spin" />
      <span> {text || "Please wait..."}</span>
    </div>
  );
}

export default SubmittingLoader;
