import React from "react";

function TableLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full min-w-[600px] rounded-lg border-collapse text-base  p-2 whitespace-nowrap  overflow-hidden ">
        {children}
      </table>
    </div>
  );
}

export default TableLayout;
