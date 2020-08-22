import React from "react";
import "./input.scss";

const Input = ({ name, label, type, value, onChange }) => {
  return (
    <div className="m-1">
      {label && (
        <label className="mr-1" htmlFor={name}>
          {label}
        </label>
      )}
      <input name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
