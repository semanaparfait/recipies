interface BaseProps {
  className?: string;
}

interface InputProps extends BaseProps {
  label?: string;
  value: string;
  name?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export type { InputProps };
