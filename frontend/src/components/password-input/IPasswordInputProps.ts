import React from "react";

export interface IPasswordInputProps {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterKeyPress?: () => void;
  value?: string;
  name: string;
  variant?: string;
}
