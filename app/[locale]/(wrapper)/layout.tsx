import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

type Props = {
  login: React.ReactNode;
  dashboard: React.ReactNode;
};

function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="ml-64 p-6">
        <Header />
        <main className="mt-8">{children}</main>
      </div>
    </>
  );
}

function Layout({ login, dashboard }: Props) {
  return (
    <>
      <LayoutDashboard>{dashboard}</LayoutDashboard>
    </>
  );
}

export default Layout;
