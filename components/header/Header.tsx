"use client";
import { useState, useEffect, useMemo, use } from "react";
import Breadcrumb from "./Breadcrumb";
import { NavigationItem, useNavigationStore } from "@/store/navigationStore";
import { usePathname } from "next/navigation";
import { navigation } from "@/store/navigationStore";
import { Skeleton } from "../ui/skeleton";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguageStore } from "@/store/languageStore";

function Header() {
  const { breadcrumb, setBreadcrumb } = useNavigationStore();
  const path = usePathname();
  const { language, setLanguage } = useLanguageStore();

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
      <div className="flex justify-between">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="w-27">
          <Select
            onValueChange={(val) => setLanguage(val)}
            defaultValue={language}
          >
            <SelectTrigger className="focus:ring-primary">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="en">
                <div className="flex items-center mr-3 gap-2">
                  <Image
                    src="/images/US.png"
                    alt="lang en"
                    width={24}
                    height={24}
                  />
                  <span className="font-semibold text-sm text-neutral-500">
                    en
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="de">
                <div className="flex items-center mr-3 gap-2">
                  <Image
                    src="/images/DE.png"
                    width={24}
                    height={24}
                    alt="lang de"
                  />
                  <span className="font-semibold text-sm text-neutral-500">
                    de
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
