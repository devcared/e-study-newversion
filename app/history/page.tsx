"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Clock, Bell, Calendar } from "lucide-react";
import { useApp } from "@/context/app-context";

interface HistoryItem {
  id: string;
  type: "announcement" | "substitution";
  title: string;
  message: string;
  date: string;
  time: string;
  createdAt: number;
  status: "active" | "completed" | "cancelled";
  period?: string;
}

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

const getStatus = (date: string): "active" | "completed" | "cancelled" => {
  const itemDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  itemDate.setHours(0, 0, 0, 0);

  if (itemDate < today) {
    return "completed";
  } else if (itemDate.getTime() === today.getTime()) {
    return "active";
  } else {
    return "active";
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function HistoryPage() {
  const { announcements, substitutions } = useApp();

  const historyItems = useMemo<HistoryItem[]>(() => {
    const items: HistoryItem[] = [];

    // Add announcements
    announcements.forEach((announcement) => {
      items.push({
        id: announcement.id,
        type: "announcement",
        title: announcement.title,
        message: announcement.message,
        date: announcement.date,
        time: formatTime(announcement.createdAt),
        createdAt: announcement.createdAt,
        status: getStatus(announcement.date),
      });
    });

    // Add substitutions
    substitutions.forEach((substitution) => {
      items.push({
        id: substitution.id,
        type: "substitution",
        title: `${substitution.period}: ${substitution.message}`,
        message: substitution.message,
        date: substitution.date,
        time: formatTime(substitution.createdAt),
        createdAt: substitution.createdAt,
        status: substitution.type === "cancelled" ? "cancelled" : getStatus(substitution.date),
        period: substitution.period,
      });
    });

    // Sort by creation date (newest first)
    return items.sort((a, b) => b.createdAt - a.createdAt);
  }, [announcements, substitutions]);
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

        {historyItems.length > 0 ? (
          <div className="space-y-3">
            {historyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
              >
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardBody className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {item.type === "announcement" ? (
                            <Bell className="w-5 h-5 text-[#00A7FF]" />
                          ) : (
                            <Calendar className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-800">
                              {item.title}
                            </h3>
                            <Chip
                              color={getStatusColor(item.status)}
                              size="sm"
                              variant="flat"
                              classNames={{
                                base: "flex-shrink-0",
                              }}
                            >
                              {item.status === "active"
                                ? "Aktiv"
                                : item.status === "completed"
                                  ? "Abgeschlossen"
                                  : "Abgebrochen"}
                            </Chip>
                          </div>
                          {item.message && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.message}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                            <span>{formatDate(item.date)}</span>
                            <span>{item.time}</span>
                            <span className="capitalize">
                              {item.type === "announcement"
                                ? "Ankündigung"
                                : "Vertretung"}
                            </span>
                            {item.period && (
                              <Chip size="sm" variant="flat" className="text-xs">
                                {item.period}
                              </Chip>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white shadow-sm">
              <CardBody className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Kein Verlauf vorhanden</p>
                <p className="text-sm text-gray-500 mt-2">
                  Es wurden noch keine Ankündigungen oder Vertretungen erstellt.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

