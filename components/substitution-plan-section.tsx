"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Plus, Trash2 } from "lucide-react";
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
import { useState } from "react";

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

export const SubstitutionPlanSection = ({ selectedDate }: { selectedDate?: Date }) => {
  const router = useRouter();
  const { getSubstitutionsByDate, deleteSubstitution } = useApp();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const dateToUse = selectedDate || new Date();
  const substitutions = getSubstitutionsByDate(dateToUse);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    onOpen();
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteSubstitution(deleteId);
      addToast({
        title: "Gelöscht",
        description: "Die Vertretung wurde erfolgreich gelöscht",
        color: "success",
      });
      setDeleteId(null);
      onClose();
    }
  };
  
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
              onClick={() => router.push("/create?tab=substitution")}
            >
              Plan Änderung
            </Button>
          </motion.div>
        </div>

        {/* Substitution Entries */}
        <div className="flex flex-col gap-3">
          {substitutions.length > 0 ? (
            substitutions.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01, y: -1 }}
                className={`${getBackgroundColor(entry.type)} rounded-full p-2 relative group`}
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
                  <motion.button
                    onClick={() => handleDelete(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 text-center"
            >
              <p className="text-gray-500">Keine Vertretungen für diesen Tag</p>
            </motion.div>
          )}
        </div>
        
        <Modal isOpen={isOpen} onClose={onClose} radius="lg">
          <ModalContent>
            <ModalHeader>Vertretung löschen?</ModalHeader>
            <ModalBody>
              <p>Möchten Sie diese Vertretung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.</p>
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
    </motion.section>
  );
};
