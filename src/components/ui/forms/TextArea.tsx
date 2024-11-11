interface textAreaTypes {
  id: string;
  textArea: string;
  textAreaLabel: string;
  inputType: string;
}

function textAreaField({ id, textAreaLabel }: textAreaTypes) {
  return (
    <div>
      <label htmlFor={id}>{textAreaLabel}</label>
      <textarea id={id}></textarea>
    </div>
  );
}

export default textAreaField;
