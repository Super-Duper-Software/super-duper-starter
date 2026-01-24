"use client";
import { GripVertical } from "lucide-react";
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  GridListLoadMoreItem as AriaGridListLoadMoreItem,
  Button,
  type GridListItemProps,
  type GridListLoadMoreItemProps,
  type GridListProps,
} from "react-aria-components";
import { Checkbox } from "./Checkbox";
import { ProgressCircle } from "./ProgressCircle";
import "./GridList.css";

export function GridList<T extends object>({
  children,
  layout = "grid",
  ...props
}: GridListProps<T>) {
  return (
    <AriaGridList {...props} layout={layout}>
      {children}
    </AriaGridList>
  );
}

export function GridListItem({
  children,
  ...props
}: Omit<GridListItemProps, "children"> & {
  children?: React.ReactNode;
}) {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && (
            <Button slot="drag">
              <GripVertical size={16} />
            </Button>
          )}
          {selectionMode === "multiple" && selectionBehavior === "toggle" && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </AriaGridListItem>
  );
}

export function GridListLoadMoreItem(props: GridListLoadMoreItemProps) {
  return (
    <AriaGridListLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaGridListLoadMoreItem>
  );
}
