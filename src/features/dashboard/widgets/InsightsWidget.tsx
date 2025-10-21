import { TangibleCard } from '@/components/ui/tangible-card';
import { Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const InsightsWidget = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const insights = [
    `You have ${activeSubscriptions.length} active subscriptions`,
    'Entertainment is your highest spending category',
    '2 subscriptions renewing this week',
  ];

  return (
    <TangibleCard color="pink">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-foreground/10 p-2 backdrop-blur-sm">
          <Sparkles className="h-5 w-5 text-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold">AI Insights</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-xs">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TangibleCard>
  );
};
