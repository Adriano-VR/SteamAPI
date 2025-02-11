"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullScreenPage = pathname.startsWith("/gameDetails/"); // Verifica se a URL começa com "/gameDetails/"

  return (
    <main
      className={clsx(
        
        isFullScreenPage ? "h-screen" : " h-screen container mx-auto  pt-2 px-6 flex-grow  " // Remove container apenas nessa página
      )}
    >
      {children}
    </main>
  );
}
