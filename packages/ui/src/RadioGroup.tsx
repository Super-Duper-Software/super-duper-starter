"use client";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  composeRenderProps,
  type RadioProps,
  type ValidationResult,
} from "react-aria-components";
import { Description, FieldError, Label } from "./Form";
import "./RadioGroup.css";
import "./utilities.css";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props}>
      <Label>{label}</Label>
      <div className="radio-items">{children}</div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}

export function Radio(props: RadioProps) {
  return (
    <AriaRadio {...props}>
      {composeRenderProps(props.children, (children) => (
        <>
          <div className="indicator" />
          {children}
        </>
      ))}
    </AriaRadio>
  );
}
