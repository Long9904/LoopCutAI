import { TangibleCard } from '@/components/ui/tangible-card';
import { Calendar } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const CalendarWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const now = new Date();
  const upcomingPayments = activeSubscriptions
    .map((sub) => ({
      ...sub,
      daysUntil: Math.ceil((new Date(sub.nextBillDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .filter((sub) => sub.daysUntil >= 0 && sub.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <TangibleCard color="blue">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Next 7 Days</p>
          <h3 className="mt-2 text-3xl font-bold">{upcomingPayments.length} Payments</h3>
        </div>
        <div className="rounded-full bg-white/50 p-3">
          <Calendar className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {upcomingPayments.slice(0, 3).map((sub) => (
          <div key={sub.id} className="flex items-center justify-between text-sm">
            <span className="font-medium">{sub.name}</span>
            <span className="text-muted-foreground">{sub.daysUntil === 0 ? 'Today' : `${sub.daysUntil}d`}</span>
          </div>
        ))}
        {upcomingPayments.length === 0 && (
          <p className="text-sm text-muted-foreground">No upcoming payments</p>
        )}
      </div>
    </TangibleCard>
  );
};
