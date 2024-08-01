import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 py-3">
      <div className="mx-auto flex items-center justify-between px-5">
        <div className="text-white font-semibold text-lg font-sans">
          Working Scheduler
        </div>
      </div>
    </header>
  );
};

export default Header;
