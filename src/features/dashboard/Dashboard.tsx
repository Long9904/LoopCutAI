import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const Dashboard = () => {
  const { subscriptions, currentProfile } = useAppStore();

  const totalMonthlyCost = subscriptions
    .filter((sub) => currentProfile.subscriptions.includes(sub.id))
    .reduce((sum, sub) => {
      if (sub.billingCycle === 'monthly') return sum + sub.cost;
      if (sub.billingCycle === 'yearly') return sum + sub.cost / 12;
      return sum + sub.cost * 4;
    }, 0);

  const upcomingSub = subscriptions
    .filter((sub) => currentProfile.subscriptions.includes(sub.id))
    .sort((a, b) => new Date(a.nextBillDate).getTime() - new Date(b.nextBillDate).getTime())[0];

  const categoryTotals = subscriptions
    .filter((sub) => currentProfile.subscriptions.includes(sub.id))
    .reduce((acc, sub) => {
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

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's your subscription overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TangibleCard color="blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                <h2 className="mt-2 text-3xl font-bold">${totalMonthlyCost.toFixed(2)}</h2>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TangibleCard color="green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                <h2 className="mt-2 text-3xl font-bold">{subscriptions.length}</h2>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TangibleCard color="yellow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Bill</p>
                {upcomingSub && (
                  <>
                    <h2 className="mt-2 text-xl font-bold">{upcomingSub.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      in {getDaysUntil(upcomingSub.nextBillDate)} days
                    </p>
                  </>
                )}
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </TangibleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TangibleCard color="purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                {topCategory && (
                  <>
                    <h2 className="mt-2 text-xl font-bold capitalize">{topCategory[0]}</h2>
                    <p className="text-sm text-muted-foreground">
                      ${topCategory[1].toFixed(2)}/mo
                    </p>
                  </>
                )}
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </TangibleCard>
        </motion.div>
      </div>

      {/* Recent Subscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-4 text-2xl font-bold">Recent Subscriptions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.slice(0, 6).map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <TangibleCard color={sub.color}>
                <h3 className="text-lg font-semibold">{sub.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{sub.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${sub.cost.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-medium capitalize">
                    {sub.billingCycle}
                  </span>
                </div>
              </TangibleCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
