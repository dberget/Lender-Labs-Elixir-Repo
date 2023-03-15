import React from "react";

export default Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={
      "bg-[#1a1a1a] text-inherit rounded-lg border-transparent py-1 px-4 font-medium hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
      className
    }
  >
    {children}
  </button>
);
