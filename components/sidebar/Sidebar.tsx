"use client";
import React from "react";
import CommandSearch from "./CommandInput";
import NavItems from "./NavItems";
import { navigation, useNavigationStore } from "@/store/navigationStore";
import Submenu from "./Submenu";

function Sidebar() {
  const { setActiveCategory } = useNavigationStore();

  return (
    <div
      onMouseLeave={() => setActiveCategory(null)}
      className="flex fixed z-10  top-0 left-0"
    >
      <aside className="z-20 h-screen w-64 bg-white border-r border-neutral-200">
        <div
          className="w-full py-6 flex flex-col gap-6 "
          onMouseEnter={() => setActiveCategory(null)}
        >
          <h3 className="text-neutral-900 text-3xl font-semibold px-6">
            <span className="text-primary">Bird</span>Dash
          </h3>
          <CommandSearch />
        </div>
        <nav>
          <NavItems items={navigation} />
        </nav>
        <div
          className="w-full h-full "
          onMouseEnter={() => setActiveCategory(null)}
        ></div>
      </aside>
      <Submenu />
    </div>
  );
}

export default Sidebar;
