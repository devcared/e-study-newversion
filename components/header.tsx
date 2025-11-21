"use client";

import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Bell } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [selectedClass, setSelectedClass] = useState("12ME2");

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: User Profile */}
        <div className="flex items-center gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            className="w-12 h-12 border-2 border-[#00A7FF]"
            size="lg"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              Emil Schröder
            </span>
            <span className="text-xs text-gray-500">
              Schüler / 12ME2
            </span>
          </div>
        </div>

        {/* Middle: Class Select */}
        <div className="flex-1 max-w-xs mx-4">
          <Select
            selectedKeys={[selectedClass]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              setSelectedClass(selected);
            }}
            classNames={{
              base: "w-full",
              trigger: "bg-white border border-gray-300 rounded-lg h-12 px-3",
              value: "text-sm font-semibold text-gray-800",
              label: "text-xs text-gray-500",
            }}
            label="Klasse"
            placeholder="Klasse auswählen"
            variant="bordered"
            size="sm"
          >
            <SelectItem key="12ME2">
              12ME2
            </SelectItem>
            <SelectItem key="11ME1">
              11ME1
            </SelectItem>
            <SelectItem key="10ME1">
              10ME1
            </SelectItem>
          </Select>
        </div>

        {/* Right: Notification Button */}
        <Badge
          content="3"
          color="primary"
          size="sm"
          classNames={{
            badge: "bg-[#00A7FF] text-white text-xs font-medium min-w-[18px] h-[18px]",
          }}
        >
          <Button
            isIconOnly
            className="bg-[#00A7FF] text-white rounded-xl w-12 h-12"
            aria-label="Benachrichtigungen"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </Button>
        </Badge>
      </div>
    </header>
  );
};

