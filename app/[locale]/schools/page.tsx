"use client";

import { useTranslations } from "next-intl";
import React from "react";

function SchoolsPage() {
  const t = useTranslations("Index");
  return (
    <div>
      <h1>{t("title")}</h1>
      <button
        onClick={() => {
          console.log("hai");
        }}
      >
        Klick mich
      </button>
    </div>
  );
}

export default SchoolsPage;
