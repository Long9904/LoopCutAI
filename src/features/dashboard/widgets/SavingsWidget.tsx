import { TangibleCard } from '@/components/ui/tangible-card';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { PiggyBank } from 'lucide-react';

export const SavingsWidget = () => {
  const [goal, setGoal] = useState(1000);
  const [saved, setSaved] = useState(450);
  const progress = (saved / goal) * 100;

  return (
    <TangibleCard color="green">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Savings Goal</h3>
          <PiggyBank className="h-5 w-5 text-primary" />
        </div>
        
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold">${saved}</span>
            <span className="text-sm text-muted-foreground">of ${goal}</span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {progress.toFixed(0)}% Complete
          </p>
        </div>
      </div>
    </TangibleCard>
  );
};
