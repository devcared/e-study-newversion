"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Mail, Lock, LogIn, School } from "lucide-react";
import { addToast } from "@heroui/toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validierung
    if (!email.trim()) {
      addToast({
        title: "Fehler",
        description: "Bitte geben Sie Ihre E-Mail-Adresse ein!",
        color: "danger",
      });
      return;
    }

    if (!email.includes("@")) {
      addToast({
        title: "Fehler",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein!",
        color: "danger",
      });
      return;
    }

    if (!password.trim()) {
      addToast({
        title: "Fehler",
        description: "Bitte geben Sie Ihr Passwort ein!",
        color: "danger",
      });
      return;
    }

    if (password.length < 6) {
      addToast({
        title: "Fehler",
        description: "Das Passwort muss mindestens 6 Zeichen lang sein!",
        color: "danger",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simuliere Login-Request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Hier würde normalerweise die echte API-Anfrage stehen
      // const response = await fetch('/api/login', { ... });

      setIsLoading(false);
      addToast({
        title: "Erfolgreich angemeldet!",
        description: "Willkommen zurück!",
        color: "success",
      });

      // Navigation nach erfolgreichem Login
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (error) {
      setIsLoading(false);
      addToast({
        title: "Fehler",
        description: "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEF9FF] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#00A7FF] rounded-2xl mb-4 shadow-lg"
          >
            <School className="w-10 h-10 text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#00A7FF] mb-2">e-study</h1>
          <p className="text-gray-600">Melden Sie sich an, um fortzufahren</p>
        </motion.div>

        {/* Login Card */}
        <Card className="bg-white shadow-xl">
          <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">Anmeldung</h2>
            <p className="text-sm text-gray-500 mt-1">
              Geben Sie Ihre Anmeldedaten ein
            </p>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Input
                  type="email"
                  label="E-Mail"
                  placeholder="ihre.email@schule.de"
                  value={email}
                  onValueChange={setEmail}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  isRequired
                  isDisabled={isLoading}
                  classNames={{
                    inputWrapper: "bg-white border border-gray-200 h-12",
                    label: "text-gray-700 font-medium",
                  }}
                  radius="lg"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Input
                  type="password"
                  label="Passwort"
                  placeholder="Ihr Passwort"
                  value={password}
                  onValueChange={setPassword}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  isRequired
                  isDisabled={isLoading}
                  classNames={{
                    inputWrapper: "bg-white border border-gray-200 h-12",
                    label: "text-gray-700 font-medium",
                  }}
                  radius="lg"
                />
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <Checkbox
                  isSelected={rememberMe}
                  onValueChange={setRememberMe}
                  classNames={{
                    label: "text-sm text-gray-600",
                  }}
                >
                  Angemeldet bleiben
                </Checkbox>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#00A7FF] hover:underline"
                >
                  Passwort vergessen?
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#00A7FF] text-white h-12 font-semibold"
                  radius="full"
                  size="lg"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  startContent={
                    !isLoading && <LogIn className="w-5 h-5" strokeWidth={2.5} />
                  }
                >
                  {isLoading ? "Wird angemeldet..." : "Anmelden"}
                </Button>
              </motion.div>
            </form>
          </CardBody>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-600">
            Noch kein Konto?{" "}
            <Link
              href="/register"
              className="text-[#00A7FF] font-semibold hover:underline"
            >
              Jetzt registrieren
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

