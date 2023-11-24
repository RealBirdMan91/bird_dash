"use client";
import { create } from "zustand";
import { RiHome6Line } from "react-icons/ri";
import {
  MdOutlineAddChart,
  MdOutlineAddHomeWork,
  MdOutlineHomeWork,
} from "react-icons/md";
import { FiUser, FiUserPlus, FiUsers } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineBarChart, AiOutlineSafetyCertificate } from "react-icons/ai";
import { LiaCertificateSolid } from "react-icons/lia";
import { BsCardChecklist, BsUiChecks, BsUiChecksGrid } from "react-icons/bs";
import { IconType } from "react-icons";

export type SubMenu = Omit<NavigationItem, "subMenu"> & {
  path: string;
  desc: string;
};
export type NavigationItem = {
  name: string;
  icon: IconType;
  subMenu: SubMenu[];
};

export type BreadcrumbItem = {
  name: string;
  icon: IconType;
  subMenu: SubMenu;
};

export const navigation: NavigationItem[] = [
  {
    name: "schools.name",
    icon: RiHome6Line,
    subMenu: [
      {
        name: "schools.all.name",
        icon: MdOutlineHomeWork,
        path: "/schools",
        desc: "schools.all.desc",
      },
      {
        name: "schools.create.name",
        icon: MdOutlineAddHomeWork,
        path: "/schools/create",
        desc: "schools.create.desc",
      },
    ],
  },
  {
    name: "employees.name",
    icon: FiUser,
    subMenu: [
      {
        name: "employees.all.name",
        icon: FiUsers,
        path: "/employees",
        desc: "employees.all.desc",
      },
      {
        name: "employees.create.name",
        icon: FiUserPlus,
        path: "/employees/create",
        desc: "employees.create.desc",
      },
    ],
  },
  {
    name: "students.name",
    icon: RiGraduationCapLine,
    subMenu: [
      {
        name: "students.all.name",
        icon: FaUserGraduate,
        path: "/students",
        desc: "students.all.desc",
      },
      {
        name: "students.create.name",
        icon: GrAddCircle,
        path: "/students/create",
        desc: "students.create.desc",
      },
    ],
  },
  {
    name: "tasks.name",
    icon: BsCardChecklist,
    subMenu: [
      {
        name: "tasks.all.name",
        icon: BsUiChecksGrid,
        path: "/tasks",
        desc: "tasks.all.desc",
      },
      {
        name: "tasks.create.name",
        icon: BsUiChecks,
        path: "/tasks/create",
        desc: "tasks.create.desc",
      },
    ],
  },
  {
    name: "reporting.name",
    icon: TbReportAnalytics,
    subMenu: [
      {
        name: "reporting.all.name",
        icon: AiOutlineBarChart,
        path: "/reports",
        desc: "reporting.all.desc",
      },
      {
        name: "reporting.create.name",
        icon: MdOutlineAddChart,
        path: "/reports/create",
        desc: "reporting.create.desc",
      },
    ],
  },
  {
    name: "roles.name",
    icon: LiaCertificateSolid,
    subMenu: [
      {
        name: "roles.all.name",
        icon: LiaCertificateSolid,
        path: "/roles",
        desc: "roles.all.desc",
      },
      {
        name: "roles.create.name",
        icon: AiOutlineSafetyCertificate,
        path: "/roles/create",
        desc: "roles.create.desc",
      },
    ],
  },
];

type NavigationStore = {
  activeCategory: NavigationItem | null;
  breadcrumb: BreadcrumbItem | null;
  setBreadcrumb: (pathName: string) => void;
  setActiveCategory: (category: NavigationItem | null) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeCategory: null,
  breadcrumb: null,
  setBreadcrumb: (pathName) => {
    const mapPath = `/${pathName.split("/").slice(2).join("/")}`;
    navigation.forEach((item) => {
      item.subMenu.forEach((subItem) => {
        if (subItem.path === mapPath) {
          set({
            breadcrumb: { icon: item.icon, name: item.name, subMenu: subItem },
          });
        }
      });
    });
  },
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
