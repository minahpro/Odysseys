import React from "react";

const Button2 = ({ children, handleClick, classes }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full text-lg text-white bg-primary border border-transparent hover:border hover:border-primary hover:bg-white hover:text-primary ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button2;
