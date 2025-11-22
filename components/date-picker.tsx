"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const DAYS_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

interface DatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

export const DatePicker = ({ initialDate = new Date(), onDateChange }: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate all dates for the current month
  const getAllDatesInMonth = () => {
    const dates: Date[] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(currentYear, currentMonth, day));
    }
    
    return dates;
  };

  const allDates = getAllDatesInMonth();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      // Reset selected date to first day of new month
      setSelectedDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      return newDate;
    });
  };

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
    // Scroll to selected date
    scrollToDate(date);
    // Notify parent component
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const scrollToDate = (date: Date) => {
    if (scrollContainerRef.current) {
      const dayIndex = date.getDate() - 1;
      const buttonWidth = 85 + 12; // button width + gap
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = dayIndex * buttonWidth - containerWidth / 2 + buttonWidth / 2;
      
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, Math.min(scrollPosition, scrollContainerRef.current.scrollWidth - containerWidth)),
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = 
        direction === "left" 
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Scroll to selected date on mount and month change
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      scrollToDate(selectedDate);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentMonth, currentYear, selectedDate]);

  return (
    <div className="w-full bg-[#EEF9FF] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Month and Navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateMonth("prev")}
            className="w-10 h-10 flex items-center justify-center bg-blue-100 text-[#00A7FF] hover:bg-blue-200 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Vorheriger Monat"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>

          <motion.h2
            key={`${currentMonth}-${currentYear}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold text-[#00A7FF]"
          >
            {MONTHS[currentMonth]}
          </motion.h2>

          <motion.button
            onClick={() => navigateMonth("next")}
            className="w-10 h-10 flex items-center justify-center bg-blue-100 text-[#00A7FF] hover:bg-blue-200 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Nächster Monat"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pb-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#93c5fd #dbeafe",
            }}
          >
            {allDates.map((date) => {
              const isDateSelected = isSelected(date);
              const dayNumber = date.getDate();
              const dayName = DAYS_SHORT[date.getDay()];

              return (
                <motion.div
                  key={date.getTime()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    type: "rotateY",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleDateSelect(date)}
                    className={`
                      min-w-[85px] h-20 rounded-4xl font-bahnschrift font-bold flex-shrink-0
                      transition-all duration-300 border-0
                      ${
                        isDateSelected
                          ? "bg-[#00A7FF] text-white shadow-md"
                          : "bg-[#D8F1FF] text-[#00A7FF] hover:bg-[#D8F1FF] border-2 border-white"
                      }
                    `}
                    radius="full"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <motion.span
                        className={`text-3xl font-bahnschrift font-bold ${
                          isDateSelected ? "text-white" : "text-[#00A7FF]"
                        }`}
                        animate={{
                          scale: isDateSelected ? [1, 1.15, 1] : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        {dayNumber}
                      </motion.span>
                      <motion.span
                        className={`text-md font-medium ${
                          isDateSelected ? "text-white" : "text-[#00476C]"
                        }`}
                        animate={{
                          opacity: isDateSelected ? [0.8, 1, 0.8] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {dayName}
                      </motion.span>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
  );
};
