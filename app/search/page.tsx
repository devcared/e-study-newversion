"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Search, Filter, Bell, Calendar, X } from "lucide-react";
import { Button } from "@heroui/button";
import { useApp } from "@/context/app-context";

interface SearchResult {
  id: string;
  type: "announcement" | "substitution";
  title: string;
  message: string;
  date: string;
  author?: string;
  period?: string;
  createdAt: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { announcements, substitutions } = useApp();

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search in announcements
    announcements.forEach((announcement) => {
      const matchesTitle = announcement.title.toLowerCase().includes(query);
      const matchesMessage = announcement.message.toLowerCase().includes(query);
      const matchesAuthor = announcement.author.toLowerCase().includes(query);

      if (matchesTitle || matchesMessage || matchesAuthor) {
        results.push({
          id: announcement.id,
          type: "announcement",
          title: announcement.title,
          message: announcement.message,
          date: announcement.date,
          author: announcement.author,
          createdAt: announcement.createdAt,
        });
      }
    });

    // Search in substitutions
    substitutions.forEach((substitution) => {
      const matchesMessage = substitution.message.toLowerCase().includes(query);
      const matchesPeriod = substitution.period.toLowerCase().includes(query);
      const matchesTeacher = substitution.teacher?.toLowerCase().includes(query);
      const matchesRoom = substitution.room?.toLowerCase().includes(query);

      if (matchesMessage || matchesPeriod || matchesTeacher || matchesRoom) {
        results.push({
          id: substitution.id,
          type: "substitution",
          title: `${substitution.period}: ${substitution.message}`,
          message: substitution.message,
          date: substitution.date,
          period: substitution.period,
          createdAt: substitution.createdAt,
        });
      }
    });

    // Sort by relevance (title matches first, then by date)
    return results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query);
      const bTitleMatch = b.title.toLowerCase().includes(query);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return b.createdAt - a.createdAt;
    });
  }, [searchQuery, announcements, substitutions]);

  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-[#00A7FF] mb-4">Suche</h1>
          
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Suche nach Ankündigungen, Vertretungen..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search className="w-5 h-5 text-gray-400" />}
              endContent={
                searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )
              }
              classNames={{
                input: "text-sm",
                inputWrapper: "bg-white border border-gray-200",
              }}
              radius="lg"
              size="lg"
            />
            <Button
              variant="bordered"
              radius="full"
              className="text-[#00A7FF] border-[#00A7FF]"
              startContent={<Filter className="w-4 h-4" />}
            >
              Filter
            </Button>
          </div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <p className="text-sm text-gray-600">
                {searchResults.length > 0
                  ? `${searchResults.length} Ergebnis${searchResults.length !== 1 ? "se" : ""} gefunden`
                  : "Keine Ergebnisse gefunden"}
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          {searchQuery ? (
            searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardBody className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {result.type === "announcement" ? (
                            <Bell className="w-5 h-5 text-[#00A7FF]" />
                          ) : (
                            <Calendar className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-800">
                              {result.title}
                            </h3>
                            <Chip
                              size="sm"
                              variant="flat"
                              className={
                                result.type === "announcement"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-orange-100 text-orange-700"
                              }
                            >
                              {result.type === "announcement"
                                ? "Ankündigung"
                                : "Vertretung"}
                            </Chip>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                            <span>
                              {new Date(result.date).toLocaleDateString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                            {result.author && (
                              <span className="capitalize">{result.author}</span>
                            )}
                            {result.period && (
                              <Chip size="sm" variant="flat" className="text-xs">
                                {result.period}
                              </Chip>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="bg-white shadow-sm">
                <CardBody className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Keine Ergebnisse gefunden</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Versuchen Sie es mit einem anderen Suchbegriff.
                  </p>
                </CardBody>
              </Card>
            )
          ) : (
            <Card className="bg-white shadow-sm">
              <CardBody className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Suche starten</p>
                <p className="text-sm text-gray-500 mt-2">
                  Geben Sie einen Suchbegriff ein, um nach Ankündigungen und
                  Vertretungen zu suchen.
                </p>
              </CardBody>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

