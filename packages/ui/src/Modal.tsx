"use client";
import {
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";
import "./Modal.scss";

export function Modal(props: ModalOverlayProps) {
  return <RACModal {...props} />;
}
