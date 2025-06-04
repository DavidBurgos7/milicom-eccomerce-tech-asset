"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CartSheet } from "@/components/cart-sheet";

export function EcommerceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isAuthRoute = authRoutes.some(route => pathname?.startsWith(route));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <CartSheet />
    </>
  );
}