"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Plus } from "lucide-react";

interface SubstitutionEntry {
  id: string;
  period: string;
  type: "substitution" | "room-change" | "cancelled";
  message: string;
}

const substitutions: SubstitutionEntry[] = [
  {
    id: "1",
    period: "1 - 2 Stunde",
    type: "substitution",
    message: "Wir Vertreten von: Mirko Klenner",
  },
  {
    id: "2",
    period: "3 - 4 Stunde",
    type: "room-change",
    message: "Raumänderung: G410 > C312",
  },
  {
    id: "3",
    period: "5 - 6 Stunde",
    type: "cancelled",
    message: "Fällt aus aufgrund von: Besprechnung",
  },
  {
    id: "4",
    period: "1 - 2 Stunde",
    type: "substitution",
    message: "Wir Vertreten von: Mirko Klenner",
  },
  {
    id: "5",
    period: "3 - 4 Stunde",
    type: "room-change",
    message: "Raumänderung: G410 > C312",
  },
];

const getBackgroundColor = (type: string) => {
  switch (type) {
    case "substitution":
      return "bg-orange-500";
    case "room-change":
      return "bg-[#00A7FF]";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-[#00A7FF]";
  }
};

export const SubstitutionPlanSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 py-6 bg-[#EEF9FF]"
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
            Vertretungsplan
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
              Plan Änderung
            </Button>
          </motion.div>
        </div>

        {/* Substitution Entries */}
        <div className="flex flex-col gap-3">
          {substitutions.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01, y: -1 }}
              className={`${getBackgroundColor(entry.type)} rounded-full p-2`}
            >
              <div className="flex items-center justify-between gap-3">
                <Chip
                  classNames={{
                    base: "bg-white border-0",
                    content: "text-black text-xs font-semibold w-full max-w-[120px]",
                  }}
                  radius="full"
                >
                  {entry.period}
                </Chip>
                <span className="text-sm font-medium text-white text-right flex-1 mr-4">
                  {entry.message}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
