import { useState } from 'react';
import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const CalendarPage = () => {
  const { subscriptions, currentProfile } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getSubscriptionsForDay = (day: number) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return subscriptions
      .filter((sub) => currentProfile.subscriptions.includes(sub.id))
      .filter((sub) => {
        const billDate = new Date(sub.nextBillDate);
        return (
          billDate.getDate() === day &&
          billDate.getMonth() === currentDate.getMonth() &&
          billDate.getFullYear() === currentDate.getFullYear()
        );
      });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">Payment Calendar</h1>
        <p className="mt-2 text-muted-foreground">
          Track your subscription payment schedule
        </p>
      </motion.div>

      <TangibleCard>
        {/* Calendar Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <TangibleButton variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </TangibleButton>
            <TangibleButton variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </TangibleButton>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const subs = getSubscriptionsForDay(day);
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`min-h-[100px] rounded-[10px] border-[1.5px] border-border p-2 ${
                  isToday
                    ? 'bg-primary/10 shadow-[2px_2px_0px_hsl(var(--border))]'
                    : 'bg-white'
                }`}
              >
                <div className={`text-sm font-semibold ${isToday ? 'text-primary' : ''}`}>
                  {day}
                </div>
                <div className="mt-1 space-y-1">
                  {subs.map((sub) => (
                    <div
                      key={sub.id}
                      className={`rounded-[6px] border border-border px-2 py-1 text-xs font-medium bg-accent-${sub.color}`}
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </TangibleCard>
    </div>
  );
};
