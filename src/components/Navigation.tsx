"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNavBar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Venue", href: "/" },
    { name: "Queues", href: "/queues" },
    { name: "Assistant", href: "/assistant" },
    { name: "Staff", href: "/staff" },
  ];

  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 bg-[#071325]/80 backdrop-blur-xl shadow-[0_24px_48px_rgba(215,227,252,0.08)]">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black text-[#0066FF] tracking-widest font-headline uppercase">FLOWVENUE</span>
        <div className="h-6 w-px bg-outline-variant/30 hidden md:block"></div>
        <span className="hidden md:block font-headline font-bold tracking-tight uppercase text-on-surface text-sm">CHAMPIONS LEAGUE FINAL</span>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium font-headline uppercase tracking-tight px-3 py-1 transition-colors rounded ${
                isActive
                  ? "text-[#0066FF] font-bold border-b-2 border-[#0066FF]"
                  : "text-slate-400 hover:bg-blue-500/10"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button className="material-symbols-outlined text-slate-400 hover:bg-blue-500/10 transition-colors p-2 rounded-full scale-95 active:scale-90">notifications_active</button>
        <button className="material-symbols-outlined text-[#0066FF] hover:bg-blue-500/10 transition-colors p-2 rounded-full scale-95 active:scale-90 filled-icon">account_circle</button>
      </div>
    </nav>
  );
}

export function BottomNavBar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Venue", href: "/", icon: "map" },
    { name: "Queues", href: "/queues", icon: "hourglass_empty" },
    { name: "Assistant", href: "/assistant", icon: "smart_toy" },
    { name: "Staff", href: "/staff", icon: "dashboard" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-[#071325]/90 backdrop-blur-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.3)] rounded-t-xl">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center transition-all duration-200 scale-100 active:scale-95 ${
              isActive
                ? "text-[#0066FF] bg-blue-500/10 rounded-xl px-4 py-2"
                : "text-slate-500 hover:text-blue-400"
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>
              {link.icon}
            </span>
            <span className="font-label text-[10px] font-bold uppercase tracking-widest mt-1">
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
