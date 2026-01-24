"use client";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  Input,
  type ValidationResult,
} from "react-aria-components";
import { Description, FieldError, Label } from "./Form";
import "./TextField.css";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <Input className="react-aria-Input inset" placeholder={placeholder} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
