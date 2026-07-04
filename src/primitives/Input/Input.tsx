import { useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps extends Pick<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type" | "max" | "placeholder" | "maxLength"
> {
  testID?: string;
  name: string;
  onChange?: (value: string) => void;
  delay?: number;
  label?: string;
}

export const Input = ({
  onChange,
  delay = 1500,
  label,
  name,
  ...rest
}: InputProps) => {
  const [field, { error, touched }] = useField(name);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "max-content",
      }}
    >
      {typeof label === "string" && (
        <p style={{ fontSize: "14px", marginBottom: 0 }}>{label}</p>
      )}
      <input {...rest} {...field} name={name} style={{ width: "100%" }} />
      {typeof error === "string" && touched && (
        <p style={{ fontSize: "14px", marginBottom: 0, color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};
