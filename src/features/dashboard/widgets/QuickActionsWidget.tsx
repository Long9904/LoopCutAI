import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { Plus, TrendingUp, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActionsWidget = () => {
  const navigate = useNavigate();

  return (
    <TangibleCard color="yellow">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <TangibleButton
          variant="outline"
          className="w-full justify-start"
          size="sm"
          onClick={() => navigate('/subscriptions')}
        >
          <Plus className="h-4 w-4" />
          Add Subscription
        </TangibleButton>
        <TangibleButton
          variant="outline"
          className="w-full justify-start"
          size="sm"
          onClick={() => navigate('/reports')}
        >
          <TrendingUp className="h-4 w-4" />
          View Reports
        </TangibleButton>
        <TangibleButton
          variant="outline"
          className="w-full justify-start"
          size="sm"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-4 w-4" />
          Notifications
        </TangibleButton>
      </div>
    </TangibleCard>
  );
};
