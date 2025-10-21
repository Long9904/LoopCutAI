import { TangibleCard } from '@/components/ui/tangible-card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const SpendingWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const totalMonthly = activeSubscriptions.reduce((sum, sub) => {
    if (sub.billingCycle === 'monthly') return sum + sub.cost;
    if (sub.billingCycle === 'yearly') return sum + sub.cost / 12;
    if (sub.billingCycle === 'weekly') return sum + sub.cost * 4;
    return sum;
  }, 0);

  return (
    <TangibleCard color="green">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Monthly Spending</p>
          <h3 className="mt-2 text-4xl font-bold">${totalMonthly.toFixed(2)}</h3>
          <p className="mt-2 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>On track this month</span>
          </p>
        </div>
        <div className="rounded-full bg-foreground/10 p-3 backdrop-blur-sm">
          <DollarSign className="h-6 w-6 text-foreground" />
        </div>
      </div>
    </TangibleCard>
  );
};
