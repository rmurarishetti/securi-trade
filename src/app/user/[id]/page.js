"use client"
import UserStatusComponent from "@/app/components/UserStatusComponent";
import React from "react";
import { useEffect, useState } from "react";

export default function Page() {
  return (
    <main className="flex flex-col min-h-min justify-between bg-transparent pb-10">
      <UserStatusComponent />
    </main>
  );
}
