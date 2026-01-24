"use client";
import React from "react";
import {
  Separator as RACSeparator,
  type SeparatorProps,
} from "react-aria-components";
import "./Separator.css";

export function Separator(props: SeparatorProps) {
  return <RACSeparator {...props} />;
}
