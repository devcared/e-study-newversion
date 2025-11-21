"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Lehrer Besprechung",
    message: "Aufgrund einer Lehrer Besprechung fallen die 5 - 6 Stunde für alle Mechatroniker/innen aus.",
    author: "Administrator",
  },
  {
    id: "2",
    title: "Zeugnisausgabe",
    message: "Am 22.11.2025 findet die Zeugnisausgabe statt.",
    author: "Administrator",
  },
  {
    id: "3",
    title: "Wichtige Information",
    message: "Bitte beachten Sie die neuen Öffnungszeiten der Bibliothek.",
    author: "Administrator",
  },
];

export const AnnouncementsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 py-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Button */}
        <div className="flex items-center justify-between mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xl font-bold text-[#00A7FF]"
          >
            Ankündigungen
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="bordered"
              radius="full"
              className="text-[#00A7FF] border-[#00A7FF] px-3 py-1 h-auto text-sm font-medium"
              startContent={<Plus className="w-4 h-4" strokeWidth={2.5} />}
            >
              Neue Ankündigung
            </Button>
          </motion.div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pb-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#93c5fd #dbeafe",
          }}
        >
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="max-w-[250px] flex-shrink-0"
            >
              <div className="bg-[#00A7FF] rounded-2xl p-5 h-full flex flex-col shadow-md">
                <div className="flex flex-col gap-3 flex-grow">
                  <h3 className="text-lg font-bold text-white">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed flex-grow">
                    {announcement.message}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-xs text-white/90">
                      {announcement.author}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
