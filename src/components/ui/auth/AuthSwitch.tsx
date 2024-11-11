import Link from "next/link";

interface AuthSwitchProps {
  text: string;
  linkText: string;
  hreLink: string;
}
const AuthSwitch = ({ text, linkText, hreLink }: AuthSwitchProps) => {
  return (
    <div className="flex justify-center items-center mt-3 gap-2">
      <span className="text-base text-stone-500">{text}</span>
      <Link href={hreLink}>
        <span className="text-xl text-primary_color hover:text-secondary_color underline font-medium">
          {linkText}
        </span>
      </Link>
    </div>
  );
};
export default AuthSwitch;
