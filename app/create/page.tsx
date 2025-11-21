"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Bell, Calendar, Plus, Calendar as CalendarIcon } from "lucide-react";

import { addToast } from "@heroui/toast";

import { useApp } from "@/context/app-context";

export default function CreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addAnnouncement, addSubstitution } = useApp();
  const [activeTab, setActiveTab] = useState<
    "announcement" | "substitution"
  >("announcement");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [period, setPeriod] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [room, setRoom] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "announcement" || tab === "substitution") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubmit = () => {
    if (activeTab === "announcement") {
      if (!title || !message) {
        addToast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Felder aus!",
          color: "danger",
        });
        return;
      }
      addAnnouncement({
        title,
        message,
        author: "Administrator",
        date,
      });
      addToast({
        title: "Erfolgreich erstellt!",
        description: `Ankündigung "${title}" wurde erstellt`,
        color: "success",
      });
    } else {
      if (!period || !type) {
        addToast({
          title: "Fehler",
          description: "Bitte wählen Sie Stunde und Typ aus!",
          color: "danger",
      });
      return;
    }

    let finalMessage = "";
      if (type === "substitution") {
        if (!teacher) {
          addToast({
            title: "Fehler",
            description: "Bitte geben Sie den Vertretungslehrer ein!",
            color: "danger",
          });
          return;
        }
        finalMessage = `Wir Vertreten von: ${teacher}`;
      } else if (type === "room-change") {
        if (!room) {
          addToast({
            title: "Fehler",
            description: "Bitte geben Sie den neuen Raum ein!",
            color: "danger",
          });
          return;
        }
        finalMessage = `Raumänderung: ${room}`;
      } else if (type === "cancelled") {
        if (!message) {
          addToast({
            title: "Fehler",
            description: "Bitte geben Sie einen Grund ein!",
            color: "danger",
          });
          return;
        }
        finalMessage = `Fällt aus aufgrund von: ${message}`;
      }

      addSubstitution({
        period,
        type: type as "substitution" | "room-change" | "cancelled",
        message: finalMessage,
        date,
        room: room || undefined,
        teacher: teacher || undefined,
      });
      addToast({
        title: "Erfolgreich erstellt!",
        description: `Vertretung für ${period} wurde erstellt`,
        color: "success",
      });
    }

    setTitle("");
    setMessage("");
    setPeriod("");
    setType("");
    setRoom("");
    setTeacher("");
    setDate(new Date().toISOString().split("T")[0]);
    
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-[#00A7FF] mb-6">Erstellen</h1>
          
          <div className="flex gap-3 mb-6">
            <Button
              variant={activeTab === "announcement" ? "solid" : "bordered"}
              radius="full"
              className={activeTab === "announcement" ? "bg-[#00A7FF] text-white" : "text-[#00A7FF] border-[#00A7FF]"}
              onClick={() => setActiveTab("announcement")}
              startContent={<Bell className="w-4 h-4" />}
            >
              Ankündigung
            </Button>
            <Button
              variant={activeTab === "substitution" ? "solid" : "bordered"}
              radius="full"
              className={activeTab === "substitution" ? "bg-[#00A7FF] text-white" : "text-[#00A7FF] border-[#00A7FF]"}
              onClick={() => setActiveTab("substitution")}
              startContent={<Calendar className="w-4 h-4" />}
            >
              Vertretung
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-white shadow-sm">
            <CardBody className="p-6">
              {activeTab === "announcement" ? (
                <div className="space-y-4">
                  <Input
                    label="Titel"
                    placeholder="Titel der Ankündigung"
                    value={title}
                    onValueChange={setTitle}
                    isRequired
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  />
                  <Input
                    type="date"
                    label="Datum"
                    value={date}
                    onValueChange={(value) => setDate(value)}
                    startContent={<CalendarIcon className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  />
                  <Textarea
                    label="Nachricht"
                    placeholder="Nachricht eingeben..."
                    value={message}
                    onValueChange={setMessage}
                    minRows={4}
                    isRequired
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    type="date"
                    label="Datum"
                    value={date}
                    onValueChange={(value) => setDate(value)}
                    startContent={<CalendarIcon className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  />
                  <Select
                    label="Stunde"
                    placeholder="Stunde auswählen"
                    selectedKeys={period ? [period] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setPeriod(selected);
                    }}
                    isRequired
                    classNames={{
                      trigger: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  >
                    <SelectItem key="1-2">1 - 2 Stunde</SelectItem>
                    <SelectItem key="3-4">3 - 4 Stunde</SelectItem>
                    <SelectItem key="5-6">5 - 6 Stunde</SelectItem>
                    <SelectItem key="7-8">7 - 8 Stunde</SelectItem>
                  </Select>
                  <Select
                    label="Typ"
                    placeholder="Typ auswählen"
                    selectedKeys={type ? [type] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setType(selected);
                    }}
                    isRequired
                    classNames={{
                      trigger: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  >
                    <SelectItem key="substitution">Vertretung</SelectItem>
                    <SelectItem key="room-change">Raumänderung</SelectItem>
                    <SelectItem key="cancelled">Fällt aus</SelectItem>
                  </Select>
                  {type === "substitution" && (
                    <Input
                      label="Vertretungslehrer"
                      placeholder="z.B. Mirko Klenner"
                      value={teacher}
                      onValueChange={setTeacher}
                      isRequired
                      classNames={{
                        inputWrapper: "bg-white border border-gray-200",
                      }}
                      radius="lg"
                    />
                  )}
                  {type === "room-change" && (
                    <Input
                      label="Neuer Raum"
                      placeholder="z.B. C312"
                      value={room}
                      onValueChange={setRoom}
                      isRequired
                      classNames={{
                        inputWrapper: "bg-white border border-gray-200",
                      }}
                      radius="lg"
                    />
                  )}
                  {type === "cancelled" && (
                    <Textarea
                      label="Grund"
                      placeholder="z.B. Besprechnung"
                      value={message}
                      onValueChange={setMessage}
                      minRows={3}
                      isRequired
                      classNames={{
                        inputWrapper: "bg-white border border-gray-200",
                      }}
                      radius="lg"
                    />
                  )}
                  {type && type !== "cancelled" && (
                    <Textarea
                      label="Zusätzliche Informationen (optional)"
                      placeholder="Weitere Details..."
                      value={message}
                      onValueChange={setMessage}
                      minRows={2}
                      classNames={{
                        inputWrapper: "bg-white border border-gray-200",
                      }}
                      radius="lg"
                    />
                  )}
                </div>
              )}
              
              <Button
                className="mt-6 bg-[#00A7FF] text-white w-full"
                radius="full"
                size="lg"
                onClick={handleSubmit}
                startContent={<Plus className="w-5 h-5" />}
              >
                Erstellen
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

