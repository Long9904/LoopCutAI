import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  User,
  Menu,
  X,
  DollarSign,
  Target,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageThemeSwitcher } from '@/components/LanguageThemeSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'dashboard', path: '/' },
  { icon: CreditCard, label: 'subscriptions', path: '/subscriptions' },
  { icon: Calendar, label: 'calendar', path: '/calendar' },
  { icon: BarChart3, label: 'reports', path: '/reports' },
  { icon: Target, label: 'budgetGoals', path: '/budget' },
  { icon: Sparkles, label: 'aiInsights', path: '/insights' },
  { icon: MessageSquare, label: 'aiChat', path: '/ai-chat' },
  { icon: Bell, label: 'notifications', path: '/notifications' },
  { icon: User, label: 'profile', path: '/profile' },
  { icon: Settings, label: 'settings', path: '/settings' },
];

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 240 }}
        className="border-r-[1.5px] border-border bg-sidebar"
      >
        <div className="flex h-full flex-col">
          {/* Logo & Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4">
              {!collapsed && (
                <Link to="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <DollarSign className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-sidebar-foreground">LoopCutAI</span>
                </Link>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded-lg p-2 hover:bg-sidebar-accent"
              >
                {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </button>
            </div>

            {!collapsed && (
              <div className="px-4">
                <LanguageThemeSwitcher />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent border-[1.5px] border-sidebar-border'
                        : 'hover:bg-sidebar-accent/50'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{t(item.label)}</span>}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
