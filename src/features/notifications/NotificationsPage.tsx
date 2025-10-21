import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Bell, DollarSign, Lightbulb, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead } = useAppStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-5 w-5" />;
      case 'insight':
        return <Lightbulb className="h-5 w-5" />;
      case 'reminder':
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'blue';
      case 'insight':
        return 'yellow';
      case 'reminder':
        return 'purple';
      default:
        return 'white';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-2 text-muted-foreground">
            Stay updated with your subscription activity
          </p>
        </div>
        <TangibleButton variant="outline">
          <CheckCircle className="h-5 w-5" />
          Mark All Read
        </TangibleButton>
      </motion.div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TangibleCard color={getColor(notification.type) as any}>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/50 p-3">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString()} at{' '}
                        {new Date(notification.date).toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="ml-4 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  {!notification.read && (
                    <TangibleButton
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      Mark as Read
                    </TangibleButton>
                  )}
                </div>
              </div>
            </TangibleCard>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg text-muted-foreground">No notifications yet</p>
        </motion.div>
      )}
    </div>
  );
};
