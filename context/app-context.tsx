"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
  date: string;
  createdAt: number;
}

interface SubstitutionEntry {
  id: string;
  period: string;
  type: "substitution" | "room-change" | "cancelled";
  message: string;
  date: string;
  room?: string;
  teacher?: string;
  createdAt: number;
}

interface Notification {
  id: string;
  type: "announcement" | "substitution" | "info";
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
}

interface AppContextType {
  announcements: Announcement[];
  substitutions: SubstitutionEntry[];
  notifications: Notification[];
  unreadNotifications: number;
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  addSubstitution: (substitution: Omit<SubstitutionEntry, "id" | "createdAt">) => void;
  deleteAnnouncement: (id: string) => void;
  deleteSubstitution: (id: string) => void;
  getSubstitutionsByDate: (date: Date) => SubstitutionEntry[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper function to safely get from localStorage
const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Helper function to safely set to localStorage
const setToLocalStorage = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore errors
  }
};

// Initial data
const getInitialAnnouncements = (): Announcement[] => [
  {
    id: "1",
    title: "Lehrer Besprechung",
    message: "Aufgrund einer Lehrer Besprechung fallen die 5 - 6 Stunde für alle Mechatroniker/innen aus.",
    author: "Administrator",
    date: new Date().toISOString().split("T")[0],
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Zeugnisausgabe",
    message: "Am 22.11.2025 findet die Zeugnisausgabe statt.",
    author: "Administrator",
    date: new Date().toISOString().split("T")[0],
    createdAt: Date.now() - 86400000,
  },
];

const getInitialSubstitutions = (): SubstitutionEntry[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return [
    {
      id: "1",
      period: "1 - 2 Stunde",
      type: "substitution",
      message: "Wird vertreten von: Mirko Klenner",
      date: today.toISOString().split("T")[0],
      teacher: "Mirko Klenner",
      createdAt: Date.now(),
    },
    {
      id: "2",
      period: "3 - 4 Stunde",
      type: "room-change",
      message: "Raumänderung: G410 > C312",
      date: today.toISOString().split("T")[0],
      room: "C312",
      createdAt: Date.now(),
    },
    {
      id: "3",
      period: "5 - 6 Stunde",
      type: "cancelled",
      message: "Fällt aus aufgrund von: Besprechnung",
      date: today.toISOString().split("T")[0],
      createdAt: Date.now(),
    },
    {
      id: "4",
      period: "1 - 2 Stunde",
      type: "substitution",
      message: "Wird vertreten von: Anna Müller",
      date: tomorrow.toISOString().split("T")[0],
      teacher: "Anna Müller",
      createdAt: Date.now() - 86400000,
    },
    {
      id: "5",
      period: "3 - 4 Stunde",
      type: "room-change",
      message: "Raumänderung: A101 > B205",
      date: tomorrow.toISOString().split("T")[0],
      room: "B205",
      createdAt: Date.now() - 86400000,
    },
  ];
};

const getInitialNotifications = (): Notification[] => [
  {
    id: "1",
    type: "announcement",
    title: "Neue Ankündigung",
    message: "Lehrer Besprechung wurde erstellt",
    read: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: "2",
    type: "substitution",
    title: "Neue Vertretung",
    message: "Vertretung für 1-2 Stunde wurde hinzugefügt",
    read: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: "3",
    type: "info",
    title: "System-Update",
    message: "Das System wurde aktualisiert",
    read: false,
    createdAt: Date.now() - 86400000,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize with defaults first (SSR-safe)
  const [announcements, setAnnouncements] = useState<Announcement[]>(getInitialAnnouncements);
  const [substitutions, setSubstitutions] = useState<SubstitutionEntry[]>(getInitialSubstitutions);
  const [notifications, setNotifications] = useState<Notification[]>(getInitialNotifications);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const savedAnnouncements = getFromLocalStorage("announcements");
    if (savedAnnouncements) {
      try {
        const parsed = JSON.parse(savedAnnouncements);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
        }
      } catch {
        // Keep defaults
      }
    }

    const savedSubstitutions = getFromLocalStorage("substitutions");
    if (savedSubstitutions) {
      try {
        const parsed = JSON.parse(savedSubstitutions);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubstitutions(parsed);
        }
      } catch {
        // Keep defaults
      }
    }

    const savedNotifications = getFromLocalStorage("notifications");
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotifications(parsed);
        }
      } catch {
        // Keep defaults
      }
    }
  }, []);


  // Save to localStorage whenever data changes
  useEffect(() => {
    setToLocalStorage("announcements", JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    setToLocalStorage("substitutions", JSON.stringify(substitutions));
  }, [substitutions]);

  useEffect(() => {
    setToLocalStorage("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const addAnnouncement = (announcement: Omit<Announcement, "id" | "createdAt">) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: "announcement",
      title: "Neue Ankündigung",
      message: announcement.title,
      read: false,
      createdAt: Date.now(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const addSubstitution = (substitution: Omit<SubstitutionEntry, "id" | "createdAt">) => {
    const newSubstitution: SubstitutionEntry = {
      ...substitution,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setSubstitutions((prev) => [newSubstitution, ...prev]);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: "substitution",
      title: "Neue Vertretung",
      message: `${substitution.period}: ${substitution.message}`,
      read: false,
      createdAt: Date.now(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteSubstitution = (id: string) => {
    setSubstitutions((prev) => prev.filter((s) => s.id !== id));
  };

  const getSubstitutionsByDate = (date: Date): SubstitutionEntry[] => {
    const dateString = date.toISOString().split("T")[0];
    return substitutions.filter((s) => s.date === dateString);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        announcements,
        substitutions,
        notifications,
        unreadNotifications,
        addAnnouncement,
        addSubstitution,
        deleteAnnouncement,
        deleteSubstitution,
        getSubstitutionsByDate,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

