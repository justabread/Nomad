import { ChangeEventHandler, FC } from "react";

export interface SelectProps {
  label: string;
  options: {
    title: string;
    value: string | number;
  }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: string | number;
}

const Select: FC<SelectProps> = ({ label, options, onChange, value }) => {
  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map(({ title, value }) => {
          return (
            <option key={value} value={value}>
              {title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
