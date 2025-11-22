"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/app-context";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";

export const AnnouncementsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { announcements, deleteAnnouncement } = useApp();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    onOpen();
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteAnnouncement(deleteId);
      addToast({
        title: "Gelöscht",
        description: "Die Ankündigung wurde erfolgreich gelöscht",
        color: "success",
      });
      setDeleteId(null);
      onClose();
    }
  };

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
              onClick={() => router.push("/create?tab=announcement")}
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
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="max-w-[250px] flex-shrink-0 relative group"
            >
              <div className="bg-[#00A7FF] rounded-2xl p-5 h-full flex flex-col shadow-md">
                <div className="flex flex-col gap-3 flex-grow">
                  <h3 className="text-lg font-bold text-white">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed flex-grow">
                    {announcement.message}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <Chip
                      startContent={
                        <Avatar
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                          className="w-4 h-4"
                          size="sm"
                        />
                      }
                      classNames={{
                        base: "bg-white/20 border-0",
                        content: "text-white text-xs font-medium",
                      }}
                      radius="full"
                      variant="flat"
                    >
                      {announcement.author}
                    </Chip>
                    <motion.button
                      onClick={() => handleDelete(announcement.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 text-center min-w-[250px]"
            >
              <p className="text-gray-500">Keine Ankündigungen vorhanden</p>
            </motion.div>
          )}
          
          <Modal isOpen={isOpen} onClose={onClose} radius="lg">
            <ModalContent>
              <ModalHeader>Ankündigung löschen?</ModalHeader>
              <ModalBody>
                <p>Möchten Sie diese Ankündigung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button
                  color="danger"
                  onPress={confirmDelete}
                  startContent={<Trash2 className="w-4 h-4" />}
                >
                  Löschen
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </motion.section>
  );
};
