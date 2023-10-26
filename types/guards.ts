import { NavigationItem, SubMenu } from "@/store/navigationStore";

export function isNavigationItem(
  item: NavigationItem | SubMenu
): item is NavigationItem {
  return "subMenu" in item;
}
