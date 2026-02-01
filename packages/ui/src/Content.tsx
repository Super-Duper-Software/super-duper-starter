import {
  Heading as AriaHeading,
  Text as AriaText,
  type HeadingProps,
  type TextProps,
} from "react-aria-components";

import "./Content.scss";

export function Heading(props: HeadingProps) {
  return <AriaHeading {...props} />;
}

export function Text(props: TextProps) {
  return <AriaText {...props} />;
}
