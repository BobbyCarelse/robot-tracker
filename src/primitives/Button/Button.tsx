interface ButtonProps {
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  children?: string;
}

export const Button = ({ ...rest }: ButtonProps) => {
  return <button {...rest} />;
};
