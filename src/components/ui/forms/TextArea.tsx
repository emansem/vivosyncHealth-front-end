interface textAreaTypes {
  id: string;
  textAreaLabel?: string;
}

function TextArea({ id }: textAreaTypes) {
  return (
    <>
      <textarea
        className="w-full h-28 shadow-shadow1 border px-4 py-3 rounded-lg resize-none appearance-none my-2 outline-none overflow-hidden"
        id={id}
      ></textarea>
    </>
  );
}

export default TextArea;
