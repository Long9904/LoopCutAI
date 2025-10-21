import { TangibleCard } from '@/components/ui/tangible-card';
import { AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const UpcomingBillsWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const now = new Date();
  const nextBill = activeSubscriptions
    .map((sub) => ({
      ...sub,
      daysUntil: Math.ceil((new Date(sub.nextBillDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .filter((sub) => sub.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)[0];

  return (
    <TangibleCard color="coral">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Next Payment</p>
          {nextBill ? (
            <>
              <h3 className="mt-2 text-2xl font-bold">{nextBill.name}</h3>
              <p className="mt-1 text-sm">
                ${nextBill.cost.toFixed(2)} in {nextBill.daysUntil === 0 ? 'Today' : `${nextBill.daysUntil} days`}
              </p>
            </>
          ) : (
            <p className="mt-2 text-lg">No upcoming bills</p>
          )}
        </div>
        <div className="rounded-full bg-white/50 p-3">
          <AlertCircle className="h-6 w-6" />
        </div>
      </div>
    </TangibleCard>
  );
};
