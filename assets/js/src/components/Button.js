import React from "react";

export default Button = ({ disabled, children, onClick, className = "" }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={
      "bg-[#1a1a1a] text-inherit rounded-lg border-transparent px-4 font-medium hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
      className
    }
  >
    {children}
  </button>
);
