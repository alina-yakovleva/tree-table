import { FC } from "react";
import { onPreventNotNumber } from "./utils";

interface IInputProps {
    value?: string | number;
    onChange?: (value: string | number) => void;
    onSubmit?: (value: string | number) => void;
    numberOnly?: boolean;
}

export const Input: FC<IInputProps> = ({ value, onChange, onSubmit, numberOnly }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={(e) => {
        if (numberOnly) {
          onPreventNotNumber(e);
        }

        if (value && e.key === "Enter") {
          onSubmit?.(value);
        }
      }}
    />
  );
};
