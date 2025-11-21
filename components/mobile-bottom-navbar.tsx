"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Home,
  Search,
  Presentation,
  Clock,
  User,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "",
    href: "/create",
    icon: Presentation,
    isCenter: true,
  },
  {
    label: "History",
    href: "/history",
    icon: Clock,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export const MobileBottomNavbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden safe-area-inset-bottom">
        <div className="flex items-end justify-around px-2 pt-3 pb-2 relative">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <motion.div
                  key={item.href}
                  className="flex items-center justify-center -mt-4"
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <NextLink
                    href={item.href}
                    className="flex flex-col items-center justify-center"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#00A7FF] flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div
                        whileTap={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon
                          className="text-white"
                          size={28}
                          strokeWidth={2}
                        />
                      </motion.div>
                    </motion.div>
                  </NextLink>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.href}
                className="flex flex-col items-center justify-center flex-1 relative"
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <NextLink
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 w-full relative py-1"
                >
                  {/* Active indicator line at top */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#00A7FF] rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 48, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: active ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon
                      className={clsx(
                        "transition-colors duration-200",
                        active ? "text-[#00A7FF]" : "text-black"
                      )}
                      size={24}
                      strokeWidth={2}
                    />
                  </motion.div>
                  <motion.span
                    className={clsx(
                      "text-xs font-medium transition-colors duration-200",
                      active ? "text-[#3B82F6]" : "text-black"
                    )}
                    animate={{
                      color: active ? "#00A7FF" : "#000000",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </NextLink>
              </motion.div>
            );
          })}
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="h-20 md:hidden" />
    </>
  );
};

