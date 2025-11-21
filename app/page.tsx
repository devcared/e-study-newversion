"use client";

import { useState } from "react";
import { DatePicker } from "@/components/date-picker";
import { AnnouncementsSection } from "@/components/announcements-section";
import { SubstitutionPlanSection } from "@/components/substitution-plan-section";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen">
      <DatePicker onDateChange={setSelectedDate} />
      <AnnouncementsSection />
      <SubstitutionPlanSection selectedDate={selectedDate} />
    </div>
  );
}
