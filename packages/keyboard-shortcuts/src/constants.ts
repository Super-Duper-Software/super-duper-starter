const shortcutIds = ["COUNT"] as const;
export type ShortcutId = (typeof shortcutIds)[number];

export const SHORTCUTS: Record<ShortcutId, string> = {
  COUNT: "i",
};
