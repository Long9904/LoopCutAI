import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppStore } from '@/store/appStore';
import { mockMonthlySpending, mockCategorySpending } from '@/lib/mockData';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const ReportsPage = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const totalMonthlyCost = subscriptions
    .filter((sub) => currentProfile.subscriptions.includes(sub.id))
    .reduce((sum, sub) => {
      if (sub.billingCycle === 'monthly') return sum + sub.cost;
      if (sub.billingCycle === 'yearly') return sum + sub.cost / 12;
      return sum + sub.cost * 4;
    }, 0);

  const previousMonthCost = mockMonthlySpending[mockMonthlySpending.length - 2].amount;
  const currentMonthCost = mockMonthlySpending[mockMonthlySpending.length - 1].amount;
  const changePercentage = ((currentMonthCost - previousMonthCost) / previousMonthCost) * 100;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-muted-foreground">
          Insights and trends for your subscriptions
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TangibleCard color="blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Month</p>
                <h2 className="mt-2 text-3xl font-bold">${totalMonthlyCost.toFixed(2)}</h2>
              </div>
              <DollarSign className="h-10 w-10 text-primary" />
            </div>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TangibleCard color={changePercentage > 0 ? 'coral' : 'green'}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">vs Last Month</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {changePercentage > 0 ? '+' : ''}
                  {changePercentage.toFixed(1)}%
                </h2>
              </div>
              {changePercentage > 0 ? (
                <TrendingUp className="h-10 w-10 text-destructive" />
              ) : (
                <TrendingDown className="h-10 w-10 text-green-600" />
              )}
            </div>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TangibleCard color="purple">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Yearly Projection</p>
              <h2 className="mt-2 text-3xl font-bold">
                ${(totalMonthlyCost * 12).toFixed(2)}
              </h2>
            </div>
          </TangibleCard>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TangibleCard>
            <h3 className="mb-6 text-xl font-bold">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMonthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TangibleCard>
            <h3 className="mb-6 text-xl font-bold">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCategorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockCategorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TangibleCard>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <TangibleCard color="yellow">
          <h3 className="mb-4 text-xl font-bold">AI Insights</h3>
          <div className="space-y-4">
            <div className="rounded-[8px] border-[1.5px] border-border bg-card p-4">
              <h4 className="font-semibold">Software Spending Increased</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Your 'Software' category spending has increased by 15% this month, primarily due to
                Adobe Creative Cloud. Consider reviewing if all features are being utilized.
              </p>
            </div>
            <div className="rounded-[8px] border-[1.5px] border-border bg-card p-4">
              <h4 className="font-semibold">Potential Savings Detected</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                You're subscribed to both Spotify and YouTube Premium. YouTube Premium includes
                YouTube Music. You could save $10.99/month by canceling Spotify.
              </p>
            </div>
          </div>
        </TangibleCard>
      </motion.div>
    </div>
  );
};
