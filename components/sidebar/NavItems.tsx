"use client";

import { cn } from "@/lib/utils";
import {
  NavigationItem,
  SubMenu,
  useNavigationStore,
} from "@/store/navigationStore";
import { isNavigationItem } from "@/types/guards";
import React from "react";
import { useRouter } from "next/navigation";

type NavItemsProps = {
  items?: NavigationItem[] | SubMenu[];
};
type NavItemProps = {
  item: NavigationItem | SubMenu;
};

function NavItem({ item }: NavItemProps) {
  const { setActiveCategory, activeCategory, setBreadcrumb } =
    useNavigationStore();
  const router = useRouter();
  const Icon = item.icon;

  function onClickHandler() {
    if (!isNavigationItem(item)) {
      setBreadcrumb({ ...activeCategory!, subMenu: item });
      setActiveCategory(null);
      router.push(item.path);
    }
  }

  return (
    <li
      className="px-6"
      onMouseEnter={() => {
        if (isNavigationItem(item)) {
          setActiveCategory(item);
        }
      }}
    >
      <div
        className={cn(
          "flex items-center py-2 px-4 gap-2 hover:bg-neutral-100 rounded-lg  transition-all duration-200 ease-linear cursor-pointer group",
          activeCategory?.name === item.name && "bg-neutral-100"
        )}
        onClick={onClickHandler}
      >
        <span>
          <Icon
            className={cn(
              "w-5 h-5 text-neutral-700 group-hover:w-6 group-hover:h-6 group-hover:text-primary",
              activeCategory?.name === item.name && "w-6 h-6 text-primary"
            )}
          />
        </span>
        <span
          className={cn(
            "text-sm text-neutral-700 group-hover:font-semibold",
            activeCategory?.name === item.name && "font-semibold"
          )}
        >
          {item.name}
        </span>
      </div>
    </li>
  );
}

function NavItems({ items }: NavItemsProps) {
  return (
    <ul>
      {items?.map((item, index) => (
        <NavItem item={item} key={index} />
      ))}
    </ul>
  );
}

export default NavItems;
