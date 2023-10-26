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
    name: "Schools",
    icon: RiHome6Line,
    subMenu: [
      {
        name: "All Schools",
        icon: MdOutlineHomeWork,
        path: "/schools",
        desc: "Manage all your schools in here",
      },
      {
        name: "Create School",
        icon: MdOutlineAddHomeWork,
        path: "/schools/create",
        desc: "Create a new school in here",
      },
    ],
  },
  {
    name: "Employees",
    icon: FiUser,
    subMenu: [
      {
        name: "All Employees",
        icon: FiUsers,
        path: "/employees",
        desc: "Manage all your employees in here",
      },
      {
        name: "Create Employee",
        icon: FiUserPlus,
        path: "/employees/create",
        desc: "Create a new employee in here",
      },
    ],
  },
  {
    name: "Students",
    icon: RiGraduationCapLine,
    subMenu: [
      {
        name: "All Students",
        icon: FaUserGraduate,
        path: "/students",
        desc: "Manage all your students in here",
      },
      {
        name: "Create Student",
        icon: GrAddCircle,
        path: "/students/create",
        desc: "Create a new student in here",
      },
    ],
  },
  {
    name: "Tasks",
    icon: BsCardChecklist,
    subMenu: [
      {
        name: "All Tasks",
        icon: BsUiChecksGrid,
        path: "/tasks",
        desc: "Manage all your tasks in here",
      },
      {
        name: "Create Task",
        icon: BsUiChecks,
        path: "/tasks/create",
        desc: "Create a new task in here",
      },
    ],
  },
  {
    name: "Reporting",
    icon: TbReportAnalytics,
    subMenu: [
      {
        name: "All Reports",
        icon: AiOutlineBarChart,
        path: "/reports",
        desc: "Manage all your reports in here",
      },
      {
        name: "Create Report",
        icon: MdOutlineAddChart,
        path: "/reports/create",
        desc: "Create a new report in here",
      },
    ],
  },
  {
    name: "Roles",
    icon: LiaCertificateSolid,
    subMenu: [
      {
        name: "All Roles",
        icon: LiaCertificateSolid,
        path: "/roles",
        desc: "Manage all your roles in here",
      },
      {
        name: "Create Role",
        icon: AiOutlineSafetyCertificate,
        path: "/roles/create",
        desc: "Create a new role in here",
      },
    ],
  },
];

type NavigationStore = {
  activeCategory: NavigationItem | null;
  breadcrumb: BreadcrumbItem | null;
  setBreadcrumb: (category: BreadcrumbItem | null) => void;
  setActiveCategory: (category: NavigationItem | null) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeCategory: null,
  breadcrumb: null,
  setBreadcrumb: (category) => set({ breadcrumb: category }),
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
