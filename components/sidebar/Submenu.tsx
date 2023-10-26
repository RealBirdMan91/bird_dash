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
        "h-screen w-64 bg-white border-r border-neutral-200 py-6 flex flex-col gap-6  transition-all duration-300 ease-linear translate-x-[-270px]",
        activeCategory && "translate-x-0"
      )}
    >
      <NavItems items={activeCategory?.subMenu} />
    </div>
  );
}

export default Submenu;
