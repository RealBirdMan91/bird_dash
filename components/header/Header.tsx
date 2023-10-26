"use client";
import { useState, useEffect, useMemo, use } from "react";
import Breadcrumb from "./Breadcrumb";
import {
  BreadcrumbItem,
  NavigationItem,
  useNavigationStore,
} from "@/store/navigationStore";
import { usePathname } from "next/navigation";
import { navigation } from "@/store/navigationStore";
import { Skeleton } from "../ui/skeleton";
import { BiChevronRight } from "react-icons/bi";

function Header() {
  const { breadcrumb, setBreadcrumb } = useNavigationStore();
  const path = usePathname();

  const breadcrumbMap = useMemo(() => {
    const map: { [key: string]: { parent: NavigationItem; child: any } } = {};
    navigation.forEach((item) => {
      item.subMenu.forEach((subItem) => {
        map[subItem.path] = {
          parent: item,
          child: subItem,
        };
      });
    });
    return map;
  }, [navigation]);

  useEffect(() => {
    if (!breadcrumb) {
      const breadcrumbData = breadcrumbMap[path];
      setBreadcrumb({
        ...breadcrumbData.parent,
        subMenu: breadcrumbData.child,
      });
    }
  }, []);

  if (!breadcrumb)
    return (
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-6 h-6 rounded-full" />
          <BiChevronRight className="w-5 h-5 text-neutral-400" />
          <Skeleton className="w-28 h-6 rounded-full" />
          <BiChevronRight className="w-5 h-5 text-neutral-400" />
          <Skeleton className="w-28 h-6 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-48 h-9 rounded-full" />
          <Skeleton className="w-56 h-4 rounded-full" />
        </div>
        <hr />
      </div>
    );

  return (
    <header className="flex flex-col gap-5">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900">
          {breadcrumb.subMenu.name}
        </h1>
        <span className="text-neutral-500">{breadcrumb.subMenu.desc}</span>
      </div>
      <hr />
    </header>
  );
}

export default Header;
