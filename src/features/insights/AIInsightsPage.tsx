import { useState } from 'react';
import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Sparkles, TrendingUp, TrendingDown, Lightbulb, DollarSign, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface Insight {
  id: string;
  type: 'saving' | 'warning' | 'opportunity' | 'trend';
  title: string;
  description: string;
  impact: number;
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'coral';
  icon: React.ComponentType<{ className?: string }>;
}

export const AIInsightsPage = () => {
  const { subscriptions, currentProfile } = useAppStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [insights] = useState<Insight[]>([
    {
      id: '1',
      type: 'saving',
      title: 'Switch to Annual Billing',
      description: 'You could save $42.96/year by switching Spotify and Netflix to annual plans. Most services offer 15-20% discount for annual subscriptions.',
      impact: 42.96,
      color: 'green',
      icon: DollarSign,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Unused Subscription Detected',
      description: 'Your Figma Professional hasn\'t been accessed in 45 days. Consider downgrading to the free tier or cancelling to save $15/month.',
      impact: 15.00,
      color: 'coral',
      icon: TrendingDown,
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Family Plan Opportunity',
      description: 'You\'re paying for Netflix and Spotify separately. A family bundle could save you $8.99/month while adding more value.',
      impact: 8.99,
      color: 'purple',
      icon: Lightbulb,
    },
    {
      id: '4',
      type: 'trend',
      title: 'Software Spending Increasing',
      description: 'Your software category spending has increased by 25% over the last 3 months. Current monthly spend: $58.99.',
      impact: 0,
      color: 'pink',
      icon: TrendingUp,
    },
    {
      id: '5',
      type: 'opportunity',
      title: 'Student Discount Available',
      description: 'GitHub Pro offers 100% discount for students. Upload your student ID to save $4/month ($48/year).',
      impact: 48.00,
      color: 'blue',
      icon: Zap,
    },
  ]);

  const activeSubscriptions = subscriptions.filter((sub) =>
    currentProfile.subscriptions.includes(sub.id)
  );

  const totalSavingsPotential = insights
    .filter((i) => i.type === 'saving' || i.type === 'opportunity' || i.type === 'warning')
    .reduce((sum, i) => sum + i.impact, 0);

  const handleRefresh = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          Personalized recommendations to optimize your subscriptions
        </p>
        <TangibleButton size="lg" onClick={handleRefresh} disabled={isAnalyzing}>
          <Sparkles className={`h-5 w-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analyzing...' : 'Refresh Insights'}
        </TangibleButton>
      </motion.div>

      {/* Summary Card */}
      <TangibleCard color="yellow">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-foreground/10 p-4 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">💰 Potential Savings: ${totalSavingsPotential.toFixed(2)}/year</h3>
            <p className="text-muted-foreground">
              We found {insights.length} insights across your {activeSubscriptions.length} active subscriptions
            </p>
          </div>
        </div>
      </TangibleCard>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TangibleCard color={insight.color}>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-foreground/10 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{insight.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed">{insight.description}</p>
                      </div>
                      {insight.impact > 0 && (
                        <div className="ml-4 rounded-[8px] bg-foreground/10 px-3 py-1 text-right backdrop-blur-sm">
                          <p className="text-xs font-medium text-muted-foreground">Save</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${insight.impact.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <TangibleButton size="sm">
                        Take Action
                      </TangibleButton>
                      <TangibleButton variant="outline" size="sm">
                        Learn More
                      </TangibleButton>
                    </div>
                  </div>
                </div>
              </TangibleCard>
            </motion.div>
          );
        })}
      </div>

      {/* AI Explanation */}
      <TangibleCard color="blue">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-foreground/10 p-2 backdrop-blur-sm">
            <Lightbulb className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold">How AI Insights Work</h3>
            <p className="mt-2 text-sm leading-relaxed">
              Our AI analyzes your subscription patterns, usage history, payment cycles, and market alternatives to provide personalized recommendations. 
              Insights are updated weekly and prioritized by potential impact on your budget.
            </p>
          </div>
        </div>
      </TangibleCard>
    </div>
  );
};
