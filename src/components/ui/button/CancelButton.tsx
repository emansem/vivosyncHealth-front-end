function CancelButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className={` cursor-pointer  text-white bg-red-500 hover:bg-red-600 font-medium shadow-shadow1 w-full  text-base md:text-[18px] transition-all ease-linear duration-200  h-10 md:h-12 rounded-md`}
      disabled={true}
    >
      <span>{children}</span>
    </button>
  );
}

export default CancelButton;
