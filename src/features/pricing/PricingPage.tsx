import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      'Up to 5 subscriptions',
      'Basic analytics',
      'Email notifications',
      'Single profile',
    ],
    color: 'blue' as const,
  },
  {
    name: 'Premium',
    price: 9.99,
    description: 'For power users',
    features: [
      'Unlimited subscriptions',
      'Advanced analytics & AI insights',
      'Multi-profile support',
      'Payment calendar',
      'Priority support',
      'Custom categories',
    ],
    color: 'purple' as const,
    popular: true,
  },
  {
    name: 'Family',
    price: 14.99,
    description: 'Manage family subscriptions',
    features: [
      'Everything in Premium',
      'Up to 5 family members',
      'Shared subscription management',
      'Family spending reports',
      'Parental controls',
    ],
    color: 'green' as const,
  },
  {
    name: 'Group',
    price: 29.99,
    description: 'For teams and organizations',
    features: [
      'Everything in Family',
      'Unlimited members',
      'Team collaboration',
      'Advanced permissions',
      'API access',
      'Custom integrations',
      'Dedicated support',
    ],
    color: 'coral' as const,
  },
];

export const PricingPage = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight">Choose Your Plan</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Select the perfect plan for your subscription management needs
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="rounded-full border-[1.5px] border-border bg-primary px-4 py-1 text-xs font-bold text-white shadow-[2px_2px_0px_hsl(var(--border))]">
                  MOST POPULAR
                </div>
              </div>
            )}
            <TangibleCard color={tier.color} className="h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <TangibleButton
                  variant={tier.popular ? 'default' : 'outline'}
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </TangibleButton>
              </div>
            </TangibleCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </motion.div>
    </div>
  );
};
