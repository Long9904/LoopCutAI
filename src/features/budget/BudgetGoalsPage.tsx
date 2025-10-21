import { useState } from 'react';
import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface BudgetGoal {
  id: string;
  category: string;
  limit: number;
  current: number;
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'coral';
}

export const BudgetGoalsPage = () => {
  const { subscriptions, currentProfile } = useAppStore();
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([
    { id: '1', category: 'Entertainment', limit: 50, current: 38.47, color: 'coral' },
    { id: '2', category: 'Software', limit: 60, current: 58.99, color: 'pink' },
    { id: '3', category: 'Productivity', limit: 30, current: 25.00, color: 'yellow' },
    { id: '4', category: 'Total Budget', limit: 150, current: 128.50, color: 'green' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ category: '', limit: '' });

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 75) return 'text-orange-500';
    return 'text-green-600';
  };

  const getProgressVariant = (percentage: number): 'default' | 'warning' | 'destructive' => {
    if (percentage >= 90) return 'destructive';
    if (percentage >= 75) return 'warning';
    return 'default';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          Set spending limits and track your progress
        </p>
        <TangibleButton size="lg" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-5 w-5" />
          Add Budget Goal
        </TangibleButton>
      </motion.div>

      {/* Add Budget Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <TangibleCard color="blue">
            <h3 className="text-lg font-bold mb-4">New Budget Goal</h3>
            <div className="flex gap-3">
              <TangibleInput
                placeholder="Category (e.g., Fitness)"
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="flex-1"
              />
              <TangibleInput
                type="number"
                placeholder="Limit ($)"
                value={newGoal.limit}
                onChange={(e) => setNewGoal({ ...newGoal, limit: e.target.value })}
                className="w-32"
              />
              <TangibleButton
                onClick={() => {
                  if (newGoal.category && newGoal.limit) {
                    setBudgetGoals([
                      ...budgetGoals,
                      {
                        id: Date.now().toString(),
                        category: newGoal.category,
                        limit: parseFloat(newGoal.limit),
                        current: 0,
                        color: 'purple',
                      },
                    ]);
                    setNewGoal({ category: '', limit: '' });
                    setShowAddForm(false);
                  }
                }}
              >
                Add
              </TangibleButton>
            </div>
          </TangibleCard>
        </motion.div>
      )}

      {/* Budget Goals Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {budgetGoals.map((goal, index) => {
          const percentage = (goal.current / goal.limit) * 100;
          const remaining = goal.limit - goal.current;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <TangibleCard color={goal.color}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{goal.category}</h3>
                    <p className="text-sm text-muted-foreground">Monthly budget</p>
                  </div>
                  <div className="rounded-full bg-foreground/10 p-2 backdrop-blur-sm">
                    {percentage >= 90 ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Target className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-3xl font-bold ${getProgressColor(percentage)}`}>
                      ${goal.current.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">/ ${goal.limit.toFixed(2)}</span>
                  </div>

                  <Progress value={percentage} variant={getProgressVariant(percentage)} />

                  <div className="flex items-center justify-between text-sm">
                    <span className={percentage >= 90 ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className={remaining < 0 ? 'text-destructive font-medium' : 'text-green-600'}>
                      {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
                    </span>
                  </div>

                  {percentage >= 75 && (
                    <div className={`flex items-center gap-2 p-2 rounded-md backdrop-blur-sm ${percentage >= 90 ? 'bg-destructive/20 border border-destructive/30' : 'bg-orange-500/20 border border-orange-500/30'}`}>
                      <TrendingUp className={`h-4 w-4 ${percentage >= 90 ? 'text-destructive' : 'text-orange-400 dark:text-orange-300'}`} />
                      <span className={`text-xs font-medium ${percentage >= 90 ? 'text-destructive' : 'text-orange-700 dark:text-orange-200'}`}>
                        {percentage >= 90
                          ? '⚠️ Budget limit approaching!'
                          : '⚡ You\'re getting close to your limit'}
                      </span>
                    </div>
                  )}
                </div>
              </TangibleCard>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <TangibleCard color="green">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-foreground/10 p-4 backdrop-blur-sm">
            <Target className="h-8 w-8 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">Budget Performance</h3>
            <p className="text-muted-foreground">
              You're staying within your budget limits across {budgetGoals.filter(g => (g.current / g.limit) * 100 < 90).length} out of {budgetGoals.length} categories
            </p>
          </div>
        </div>
      </TangibleCard>
    </div>
  );
};
