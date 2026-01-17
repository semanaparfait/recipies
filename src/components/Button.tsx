import React from "react";
// Type for union of string literals
// type ButtonVariant = "primary" | "secondary" | "danger";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
  type?: "button" | "submit" | "reset";
}



const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  //     Record<K, V> is a TypeScript utility type that creates an object type where:

  // Keys (K) must be specific values

  // Values (V) must follow a specific type

  // In simple words:

  // Record forces an object to have exact keys with a fixed value type.

  const variantStyles: Record<typeof variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
