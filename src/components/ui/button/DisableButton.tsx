export function DisableButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className={` cursor-not-allowed  text-text_color2 bg-stone-200 font-medium shadow-shadow1 w-full  text-base md:text-[18px] transition-all ease-linear duration-200  h-10 md:h-12 rounded-md`}
      disabled={true}
    >
      <span>{children}</span>
    </button>
  );
}
