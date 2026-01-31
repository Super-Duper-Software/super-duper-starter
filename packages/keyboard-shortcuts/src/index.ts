import { useHotkeys } from "react-hotkeys-hook";
import { SHORTCUTS, type ShortcutId } from "./constants";

type UseHotKeysParams = Parameters<typeof useHotkeys>;

export default function useTypedHotKeys(
  shortcutId: ShortcutId,
  callback: UseHotKeysParams[1],
  options?: UseHotKeysParams[2],
  dependencies?: UseHotKeysParams[3],
) {
  return useHotkeys(SHORTCUTS[shortcutId], callback, options, dependencies);
}
