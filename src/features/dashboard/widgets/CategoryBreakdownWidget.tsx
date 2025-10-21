import { TangibleCard } from '@/components/ui/tangible-card';
import { PieChart } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const CategoryBreakdownWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const categoryTotals = activeSubscriptions.reduce((acc, sub) => {
    const monthlyCost =
      sub.billingCycle === 'monthly'
        ? sub.cost
        : sub.billingCycle === 'yearly'
        ? sub.cost / 12
        : sub.cost * 4;
    acc[sub.category] = (acc[sub.category] || 0) + monthlyCost;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <TangibleCard color="purple">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Top Category</p>
          {topCategory ? (
            <>
              <h3 className="mt-2 text-2xl font-bold capitalize">{topCategory[0]}</h3>
              <p className="mt-1 text-sm">${topCategory[1].toFixed(2)}/month</p>
            </>
          ) : (
            <p className="mt-2 text-lg">No data</p>
          )}
        </div>
        <div className="rounded-full bg-white/50 p-3">
          <PieChart className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {Object.entries(categoryTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category, total]) => (
            <div key={category} className="flex items-center justify-between text-sm">
              <span className="capitalize">{category}</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
          ))}
      </div>
    </TangibleCard>
  );
};
