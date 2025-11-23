"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";

const HIDE_LAYOUT_PATHS = ["/login", "/register", "/forgot-password"];

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(pathname);

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-y-auto">{children}</main>
      <MobileBottomNavbar />
    </div>
  );
}

