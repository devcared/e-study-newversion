"use client";

import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Bell, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/app-context";
import { motion, AnimatePresence } from "framer-motion";
import { addToast } from "@heroui/toast";

export const Header = () => {
  const [selectedClass, setSelectedClass] = useState("12ME2");
  const {
    notifications,
    unreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useApp();

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    addToast({
      title: "Benachrichtigung gelesen",
      description: "Die Benachrichtigung wurde als gelesen markiert",
      color: "success",
    });
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    addToast({
      title: "Alle gelesen",
      description: "Alle Benachrichtigungen wurden als gelesen markiert",
      color: "success",
    });
  };

  const handleClearAll = () => {
    clearNotifications();
    addToast({
      title: "Benachrichtigungen gelöscht",
      description: "Alle Benachrichtigungen wurden gelöscht",
      color: "default",
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Gerade eben";
    if (minutes < 60) return `Vor ${minutes} Min`;
    if (hours < 24) return `Vor ${hours} Std`;
    if (days < 7) return `Vor ${days} Tagen`;
    return date.toLocaleDateString("de-DE");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return "📢";
      case "substitution":
        return "📅";
      case "info":
        return "ℹ️";
      default:
        return "🔔";
    }
  };

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
              addToast({
                title: "Klasse geändert",
                description: `Klasse wurde zu ${selected} geändert`,
                color: "success",
              });
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
            <SelectItem key="12ME2">12ME2</SelectItem>
            <SelectItem key="11ME1">11ME1</SelectItem>
            <SelectItem key="10ME1">10ME1</SelectItem>
          </Select>
        </div>

        {/* Right: Notification Button */}
        <Dropdown placement="bottom-end" radius="lg">
          <DropdownTrigger>
            <Badge
              content={unreadNotifications > 0 ? unreadNotifications : undefined}
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
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Benachrichtigungen"
            className="max-w-[400px]"
            itemClasses={{
              base: "gap-2",
            }}
          >
            <DropdownItem
              key="header"
              className="h-14 gap-2 opacity-100"
              textValue="header"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-lg">Benachrichtigungen</span>
                {unreadNotifications > 0 && (
                  <span className="text-xs text-gray-500">
                    {unreadNotifications} ungelesen
                  </span>
                )}
              </div>
            </DropdownItem>
            <DropdownItem key="divider" className="h-1 p-0" textValue="divider">
              <div className="h-px bg-gray-200 w-full" />
            </DropdownItem>
            {notifications.length > 0 ? (
              <>
                {notifications.slice(0, 5).map((notification) => (
                  <DropdownItem
                    key={notification.id}
                    textValue={notification.title}
                    className={`${!notification.read ? "bg-blue-50" : ""}`}
                    onPress={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-800">
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#00A7FF] rounded-full" />
                          )}
                        </div>
                        <span className="text-xs text-gray-600">
                          {notification.message}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </DropdownItem>
                ))}
                <DropdownItem key="divider2" className="h-1 p-0" textValue="divider2">
                  <div className="h-px bg-gray-200 w-full" />
                </DropdownItem>
                <DropdownItem
                  key="mark-all"
                  textValue="Alle als gelesen markieren"
                  onPress={handleMarkAllAsRead}
                  startContent={<Check className="w-4 h-4" />}
                >
                  Alle als gelesen markieren
                </DropdownItem>
                <DropdownItem
                  key="clear-all"
                  textValue="Alle löschen"
                  onPress={handleClearAll}
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                >
                  Alle löschen
                </DropdownItem>
              </>
            ) : (
              <DropdownItem key="empty" textValue="Keine Benachrichtigungen">
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Keine Benachrichtigungen</p>
                </div>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};
