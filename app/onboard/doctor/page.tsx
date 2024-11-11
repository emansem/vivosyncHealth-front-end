import React from "react";

function page() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-xl text-stone-600 font-medium">
          <h1>Complete your profile in few steps</h1>
        </div>
        <div>
          <p className="relative h-4 w-full rounded-full bg-white ">
            <span className="absolute left-0 bg-primary_color h-full w-20 rounded-full right-0 bottom-0"></span>
          </p>
        </div>
      </div>
      <div>
        <ul className="flex justify-between  gap-4 flex-col md:flex-row md:items-center">
          <li>
            <p>1</p>
            <span>Personal information</span>
          </li>
          <li>
            <p>2</p>
            <span>Professional Details</span>
          </li>
          <li>
            <p>3</p>
            <span>Practice information</span>
          </li>
          <li>
            <p>4</p>
            <span>Documents Verification</span>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default page;
