"use client";
import { type LinkProps, Link as RACLink } from "react-aria-components";
import "./Link.scss";

export function Link(props: LinkProps) {
  return <RACLink {...props} />;
}
