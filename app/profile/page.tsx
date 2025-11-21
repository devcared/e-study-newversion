"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Mail, Phone, MapPin, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-[#00A7FF] mb-6">Profil</h1>
        </motion.div>

        <div className="space-y-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-white shadow-sm">
              <CardBody className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    className="w-24 h-24 border-4 border-[#00A7FF]"
                    size="lg"
                  />
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Emil Schröder</h2>
                    <p className="text-sm text-gray-500">Schüler / 12ME2</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="bg-white shadow-sm">
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Persönliche Informationen</h3>
                <div className="space-y-4">
                  <Input
                    label="E-Mail"
                    defaultValue="emil.schroeder@schule.de"
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                    isReadOnly
                  />
                  <Input
                    label="Telefon"
                    defaultValue="+49 123 456789"
                    startContent={<Phone className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                    isReadOnly
                  />
                  <Input
                    label="Adresse"
                    defaultValue="Musterstraße 123, 12345 Musterstadt"
                    startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      inputWrapper: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                    isReadOnly
                  />
                  <Select
                    label="Klasse"
                    defaultSelectedKeys={["12ME2"]}
                    classNames={{
                      trigger: "bg-white border border-gray-200",
                    }}
                    radius="lg"
                  >
                    <SelectItem key="12ME2">12ME2</SelectItem>
                    <SelectItem key="11ME1">11ME1</SelectItem>
                    <SelectItem key="10ME1">10ME1</SelectItem>
                  </Select>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <Button
              variant="bordered"
              radius="full"
              className="text-[#00A7FF] border-[#00A7FF]"
              startContent={<Settings className="w-4 h-4" />}
            >
              Einstellungen
            </Button>
            <Button
              variant="bordered"
              radius="full"
              className="text-red-500 border-red-500"
              startContent={<LogOut className="w-4 h-4" />}
            >
              Abmelden
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

