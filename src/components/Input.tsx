import React from "react";
import type { InputProps } from "@/types/inputType";

const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  name,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default Input;
