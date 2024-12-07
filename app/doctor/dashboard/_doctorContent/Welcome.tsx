import React from "react";

interface WelcomeProps {
  doctorName: string;
}
function Welcome({ doctorName }: WelcomeProps) {
  const checkTime = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return `Good morning`;
    } else if (hours < 17) {
      return "Good afternoon";
    } else if (hours < 20) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };
  return (
    <div>
      <h1 className="flex flex-col md:flex-row text-left md:items-center md:gap-2 text-xl md:text-2xl text-stone-700 font-medium">
        <span>{checkTime()},</span>
        <span className="text-primary_color">
          Dr.{doctorName.split(" ")[0]}
        </span>
      </h1>
    </div>
  );
}

export default Welcome;
