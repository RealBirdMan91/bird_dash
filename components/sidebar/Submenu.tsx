"use client";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/store/navigationStore";
import React from "react";
import NavItems from "./NavItems";

function Submenu() {
  const { activeCategory } = useNavigationStore();
  return (
    <div
      className={cn(
        "fixed top-0 left-0 translate-x-0  h-screen w-64 bg-white border-r border-neutral-200 py-6 flex flex-col gap-6  transition-all duration-300 ease-linear  dark:bg-slate-800 dark:border-slate-700",
        activeCategory && "translate-x-[255px]"
      )}
    >
      <NavItems items={activeCategory?.subMenu} />
    </div>
  );
}

export default Submenu;
