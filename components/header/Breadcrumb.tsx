"use client";
import { BreadcrumbItem } from "@/store/navigationStore";
import { useTranslations } from "next-intl";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

type Props = {
  breadcrumb: BreadcrumbItem;
};

function Breadcrumb({ breadcrumb }: Props) {
  const Icon = breadcrumb.icon;
  const t = useTranslations("Navigation");

  return (
    <div className="flex gap-2 items-center ">
      <Icon className="w-6 h-6 text-primary dark:text-white" />

      <BiChevronRight className="w-5 h-5 text-neutral-400 dark:text-white" />
      <span className="text-neutral-700 dark:text-white">
        {t(breadcrumb.name)}
      </span>
      <BiChevronRight className="w-5 h-5 text-neutral-400 dark:text-white" />
      <span className="text-neutral-700 font-semibold bg-neutral-100 px-2 py-1 rounded-lg">
        {t(breadcrumb.subMenu.name)}
      </span>
    </div>
  );
}

export default Breadcrumb;
