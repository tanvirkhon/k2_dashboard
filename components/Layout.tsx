import React from "react";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
