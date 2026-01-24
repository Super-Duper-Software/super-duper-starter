"use client";
import { ChevronDown } from "lucide-react";
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  Input,
  type ListBoxItemProps,
  type ListBoxProps,
  type ValidationResult,
} from "react-aria-components";
import { Description, FieldButton, FieldError, Label } from "./Form";
import { DropdownItem, DropdownListBox } from "./ListBox";
import { Popover } from "./Popover";

import "./ComboBox.css";

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  placeholder?: string;
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox {...props}>
      <Label>{label}</Label>
      <div className="combobox-field">
        <Input className="react-aria-Input inset" placeholder={placeholder} />
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox>{children}</ComboBoxListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxListBox<T extends object>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
