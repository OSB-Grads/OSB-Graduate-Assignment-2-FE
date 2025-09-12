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
  kind?: 'PRIMARY' | 'SECONDARY';
  disabled?: boolean;
}

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  kind = 'PRIMARY',
  disabled = false,
}: InputFieldProps) {
  return (
    <div className={`form-group ${kind.toLowerCase()}`}>
      <label>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
    </div>
  );
}
