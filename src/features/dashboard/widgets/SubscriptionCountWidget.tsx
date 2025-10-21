import { TangibleCard } from '@/components/ui/tangible-card';
import { useAppStore } from '@/store/appStore';
import { CreditCard, TrendingUp } from 'lucide-react';

export const SubscriptionCountWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();
  
  const activeCount = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  ).length;

  return (
    <TangibleCard color="purple">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Active Subscriptions</h3>
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{activeCount}</span>
          <span className="text-muted-foreground">services</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span>2 added this month</span>
        </div>
      </div>
    </TangibleCard>
  );
};
