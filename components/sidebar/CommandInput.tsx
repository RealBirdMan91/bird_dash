"use client";
import React, { useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandInput,
} from "../ui/command";

import {
  NavigationItem,
  SubMenu,
  navigation,
  useNavigationStore,
} from "@/store/navigationStore";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { sub } from "date-fns";

function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const { setBreadcrumb } = useNavigationStore();
  const router = useRouter();
  const t = useTranslations("Navigation");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function onNavigateHandler(item: NavigationItem, subItem: SubMenu) {
    setBreadcrumb(subItem.path);
    setOpen(false);
    router.push(subItem.path);
  }

  return (
    <div className="px-6">
      <button
        className="text-sm text-neutral-500 cursor-pointer w-full flex justify-between items-center border  rounded-lg py-2 px-3 dark:text-white dark:border-slate-700"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex items-center gap-1">
          <CiSearch className="w-5 h-5" />
          <span>Search</span>
        </div>
        <kbd className="flex gap-1 items-center border rounded-full py-[2px] px-4 bg-neutral-100 dark:bg-slate-900">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navigation.map((item, index) => (
            <div key={index}>
              <CommandSeparator />
              <CommandGroup heading={t(item.name)}>
                {item.subMenu.map((subItem, subIndex) => (
                  <CommandItem
                    key={subIndex}
                    onSelect={() => onNavigateHandler(item, subItem)}
                  >
                    <div className="flex gap-2 w-full">
                      <subItem.icon className="w-5 h-5 text-neutral-500" />
                      <span className="font-sm text-neutral-500">
                        {t(subItem.name)}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default CommandSearch;
