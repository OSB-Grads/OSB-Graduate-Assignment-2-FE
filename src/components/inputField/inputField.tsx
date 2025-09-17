import React from "react";
import "./inputField.css";

interface InputFieldProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: any;
}

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  style,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        style={style}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
