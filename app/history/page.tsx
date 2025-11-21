"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  type: "announcement" | "substitution";
  title: string;
  date: string;
  time: string;
  status: "active" | "completed" | "cancelled";
}

const historyItems: HistoryItem[] = [
  {
    id: "1",
    type: "announcement",
    title: "Lehrer Besprechung",
    date: "20.11.2024",
    time: "14:30",
    status: "active",
  },
  {
    id: "2",
    type: "substitution",
    title: "Vertretung 1-2 Stunde",
    date: "19.11.2024",
    time: "08:00",
    status: "completed",
  },
  {
    id: "3",
    type: "announcement",
    title: "Zeugnisausgabe",
    date: "18.11.2024",
    time: "10:15",
    status: "active",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "completed":
      return "default";
    case "cancelled":
      return "danger";
    default:
      return "default";
  }
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-[#00A7FF]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#00A7FF]">Verlauf</h1>
          </div>
        </motion.div>

        <div className="space-y-3">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <Chip
                          color={getStatusColor(item.status)}
                          size="sm"
                          variant="flat"
                        >
                          {item.status === "active" ? "Aktiv" : item.status === "completed" ? "Abgeschlossen" : "Abgebrochen"}
                        </Chip>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{item.date}</span>
                        <span>{item.time}</span>
                        <span className="capitalize">
                          {item.type === "announcement" ? "Ankündigung" : "Vertretung"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

