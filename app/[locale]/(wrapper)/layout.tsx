import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

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

async function Layout({ login, dashboard }: Props) {
  const supabase = createSupabaseServerClient(cookies);
  const { data, error } = await supabase.auth.getSession();

  return (
    <>
      {!data.session ? (
        <main className="bg-slate-700 w-screen h-screen flex items-center justify-center">
          {login}
        </main>
      ) : (
        <LayoutDashboard>{dashboard}</LayoutDashboard>
      )}
    </>
  );
}

export default Layout;
