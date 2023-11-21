"use client";
import { useEffect, useMemo } from "react";
import Breadcrumb from "./Breadcrumb";
import { NavigationItem, useNavigationStore } from "@/store/navigationStore";
import { usePathname } from "next/navigation";
import { navigation } from "@/store/navigationStore";
import { Skeleton } from "../ui/skeleton";
import { BiChevronRight } from "react-icons/bi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

function Header() {
  const { breadcrumb, setBreadcrumb } = useNavigationStore();
  const path = usePathname();
  const t = useTranslations("Navigation");

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
      const mapPath = `/${path.split("/").slice(2).join("/")}`;
      const breadcrumbData = breadcrumbMap[mapPath];
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
      <div className="flex justify-between">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="w-27">
          <LanguageSwitcher />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
          {t(breadcrumb.subMenu.name)}
        </h1>
        <span className="text-neutral-500 dark:text-white">
          {t(breadcrumb.subMenu.desc)}
        </span>
      </div>
      <hr />
    </header>
  );
}

export default Header;
