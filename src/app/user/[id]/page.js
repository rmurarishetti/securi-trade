"use client";
import UserStatusComponent from "@/app/components/UserStatusComponent";
import React from "react";

export default function Page({ params }) {
  return (
    <main className="flex flex-col min-h-min justify-between bg-transparent pb-10">
      <UserStatusComponent id={params.id} />
    </main>
  );
}
