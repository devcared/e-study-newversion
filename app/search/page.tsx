"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Search, Filter } from "lucide-react";
import { Button } from "@heroui/button";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          {searchQuery ? (
            <Card className="bg-white shadow-sm">
              <CardBody className="p-6">
                <p className="text-gray-600 text-center">
                  Suche nach: <span className="font-semibold">{searchQuery}</span>
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Ergebnisse werden hier angezeigt...
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card className="bg-white shadow-sm">
              <CardBody className="p-6">
                <p className="text-gray-600 text-center">
                  Geben Sie einen Suchbegriff ein, um zu suchen
                </p>
              </CardBody>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

