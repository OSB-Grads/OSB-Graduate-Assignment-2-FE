import React from "react";
import "./inputField.css";

interface InputFieldProps {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
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
