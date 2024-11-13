import { ChangeEvent } from "react";

interface textAreaTypes {
  id: string;
  textAreaLabel?: string;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ value, name, onChange, id }: textAreaTypes) {
  return (
    <>
      <textarea
        required
        onChange={onChange}
        name={name}
        value={value}
        className="w-full h-28 shadow-shadow1 text-text_color2 text-base border px-4 py-3 rounded-lg resize-none appearance-none my-2 outline-none overflow-hidden"
        id={id}
      ></textarea>
    </>
  );
}

export default TextArea;
