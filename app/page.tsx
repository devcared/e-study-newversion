import { DatePicker } from "@/components/date-picker";
import { AnnouncementsSection } from "@/components/announcements-section";
import { SubstitutionPlanSection } from "@/components/substitution-plan-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#EEF9FF] min-h-screen">
      <DatePicker />
      <AnnouncementsSection />
      <SubstitutionPlanSection />
    </div>
  );
}
