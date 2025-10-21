import { useState } from 'react';
import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { Settings, Bell, CreditCard, Link as LinkIcon, Shield } from 'lucide-react';

type SettingsTab = 'preferences' | 'integrations' | 'plan' | 'notifications';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('preferences');

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'plan', label: 'My Plan', icon: CreditCard },
    { id: 'notifications', label: 'Notification Rules', icon: Bell },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Customize your LoopCutAI experience
        </p>
      </motion.div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Tabs Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-64"
        >
          <TangibleCard>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={`flex w-full items-center gap-3 rounded-[8px] px-4 py-3 text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--border))]'
                        : 'hover:bg-accent-blue/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </TangibleCard>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          {activeTab === 'preferences' && (
            <TangibleCard>
              <h2 className="mb-6 text-2xl font-bold">Preferences</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Currency</label>
                  <TangibleInput defaultValue="USD" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <TangibleInput defaultValue="MM/DD/YYYY" />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Display Options</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Show upcoming payments on dashboard</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable spending insights</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Dark mode (coming soon)</span>
                    </label>
                  </div>
                </div>

                <TangibleButton>Save Preferences</TangibleButton>
              </form>
            </TangibleCard>
          )}

          {activeTab === 'integrations' && (
            <TangibleCard>
              <h2 className="mb-6 text-2xl font-bold">Integrations</h2>
              <div className="space-y-4">
                {[
                  { name: 'Bank Sync', status: 'Not Connected', color: 'blue' },
                  { name: 'Calendar Sync', status: 'Connected', color: 'green' },
                  { name: 'Email Notifications', status: 'Connected', color: 'green' },
                  { name: 'Stripe', status: 'Not Connected', color: 'purple' },
                ].map((integration) => (
                  <TangibleCard key={integration.name} color={integration.color as any}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.status}</p>
                      </div>
                      <TangibleButton variant="outline" size="sm">
                        {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </TangibleButton>
                    </div>
                  </TangibleCard>
                ))}
              </div>
            </TangibleCard>
          )}

          {activeTab === 'plan' && (
            <TangibleCard>
              <h2 className="mb-6 text-2xl font-bold">My Plan</h2>
              <div className="space-y-6">
                <TangibleCard color="purple">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Premium Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Billed monthly at $9.99
                      </p>
                    </div>
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="text-sm">
                      <strong>Next billing date:</strong> November 20, 2025
                    </p>
                    <p className="text-sm">
                      <strong>Payment method:</strong> •••• 4242
                    </p>
                  </div>
                </TangibleCard>

                <div className="flex gap-4">
                  <TangibleButton variant="outline">Change Plan</TangibleButton>
                  <TangibleButton variant="outline">Update Payment Method</TangibleButton>
                  <TangibleButton variant="destructive">Cancel Subscription</TangibleButton>
                </div>
              </div>
            </TangibleCard>
          )}

          {activeTab === 'notifications' && (
            <TangibleCard>
              <h2 className="mb-6 text-2xl font-bold">Notification Rules</h2>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Payment reminders (3 days before)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Payment confirmations</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Weekly spending summary</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">AI insights and recommendations</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Push Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Same-day payment reminders</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Spending threshold alerts</span>
                    </label>
                  </div>
                </div>

                <TangibleButton>Save Notification Settings</TangibleButton>
              </form>
            </TangibleCard>
          )}
        </motion.div>
      </div>
    </div>
  );
};
