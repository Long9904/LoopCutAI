import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { toast } from 'sonner';
import { z } from 'zod';

const subscriptionSchema = z.object({
  name: z.string().min(1, 'Subscription name is required'),
  cost: z.number().min(0.01, 'Cost must be greater than 0'),
  category: z.enum(['entertainment', 'productivity', 'software', 'fitness', 'education', 'other']),
  billingCycle: z.enum(['monthly', 'yearly', 'weekly']),
  description: z.string().optional(),
});

interface AddSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillName?: string;
}

const categoryColors: Record<string, 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'coral'> = {
  entertainment: 'coral',
  productivity: 'yellow',
  software: 'pink',
  fitness: 'green',
  education: 'purple',
  other: 'blue',
};

// AI-powered subscription suggestions
const subscriptionDatabase: Record<string, { cost: number; category: string; description: string; billingCycle: string }> = {
  'spotify': { cost: 10.99, category: 'entertainment', description: 'Premium music streaming service', billingCycle: 'monthly' },
  'netflix': { cost: 15.49, category: 'entertainment', description: 'Video streaming platform', billingCycle: 'monthly' },
  'disney+': { cost: 7.99, category: 'entertainment', description: 'Disney streaming service', billingCycle: 'monthly' },
  'youtube premium': { cost: 11.99, category: 'entertainment', description: 'Ad-free video streaming', billingCycle: 'monthly' },
  'adobe creative cloud': { cost: 54.99, category: 'software', description: 'Design and creative tools suite', billingCycle: 'monthly' },
  'figma': { cost: 15.00, category: 'productivity', description: 'Design collaboration platform', billingCycle: 'monthly' },
  'notion': { cost: 10.00, category: 'productivity', description: 'Workspace and notes organization', billingCycle: 'monthly' },
  'github': { cost: 4.00, category: 'software', description: 'Code hosting and collaboration', billingCycle: 'monthly' },
  'chatgpt': { cost: 20.00, category: 'productivity', description: 'AI assistant and chatbot', billingCycle: 'monthly' },
  'canva': { cost: 12.99, category: 'software', description: 'Graphic design platform', billingCycle: 'monthly' },
  'dropbox': { cost: 11.99, category: 'productivity', description: 'Cloud storage service', billingCycle: 'monthly' },
  'microsoft 365': { cost: 6.99, category: 'productivity', description: 'Office suite and cloud storage', billingCycle: 'monthly' },
  'linkedin premium': { cost: 29.99, category: 'productivity', description: 'Professional networking', billingCycle: 'monthly' },
  'duolingo': { cost: 6.99, category: 'education', description: 'Language learning app', billingCycle: 'monthly' },
  'peloton': { cost: 12.99, category: 'fitness', description: 'Fitness classes and workouts', billingCycle: 'monthly' },
};

export const AddSubscriptionDialog = ({ open, onOpenChange, prefillName = '' }: AddSubscriptionDialogProps) => {
  const { addSubscription, currentProfile } = useAppStore();
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: prefillName,
    cost: '',
    category: 'entertainment' as const,
    billingCycle: 'monthly' as const,
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // AI-powered auto-fill based on subscription name
  const handleAiAssist = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter subscription name first');
      return;
    }

    setIsAiAssisting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const searchKey = formData.name.toLowerCase();
      let suggestion = null;

      // Find matching subscription from database
      for (const [key, value] of Object.entries(subscriptionDatabase)) {
        if (searchKey.includes(key) || key.includes(searchKey)) {
          suggestion = value;
          break;
        }
      }

      if (suggestion) {
        setFormData(prev => ({
          ...prev,
          cost: suggestion.cost.toString(),
          category: suggestion.category as any,
          description: suggestion.description,
          billingCycle: suggestion.billingCycle as any,
        }));
        toast.success('✨ AI auto-filled the information!');
      } else {
        // Smart defaults based on common patterns
        const smartDefaults = {
          cost: '9.99',
          description: `${formData.name} subscription service`,
        };
        setFormData(prev => ({
          ...prev,
          ...smartDefaults,
        }));
        toast.info('💡 Applied smart defaults');
      }
      
      setIsAiAssisting(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = subscriptionSchema.parse({
        name: formData.name,
        cost: parseFloat(formData.cost),
        category: formData.category,
        billingCycle: formData.billingCycle,
        description: formData.description,
      });

      // Calculate next bill date
      const today = new Date();
      const daysToAdd = formData.billingCycle === 'monthly' ? 30 : formData.billingCycle === 'yearly' ? 365 : 7;
      const nextBillDate = new Date(today.setDate(today.getDate() + daysToAdd)).toISOString().split('T')[0];

      const newSubscription = {
        id: `sub_${Date.now()}`,
        name: validated.name,
        cost: validated.cost,
        currency: 'USD',
        billingCycle: validated.billingCycle,
        category: validated.category,
        nextBillDate,
        description: validated.description || '',
        color: categoryColors[validated.category],
      };

      addSubscription(newSubscription);
      
      // Update current profile's subscriptions
      currentProfile.subscriptions.push(newSubscription.id);

      toast.success(`🎉 Successfully added ${validated.name}!`);
      
      // Reset form
      setFormData({
        name: '',
        cost: '',
        category: 'entertainment',
        billingCycle: 'monthly',
        description: '',
      });
      
      onOpenChange(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Please check the form information');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Subscription</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Subscription Name with AI Assist */}
          <div className="space-y-2">
            <Label htmlFor="name">Subscription Name *</Label>
            <div className="flex gap-2">
              <TangibleInput
                id="name"
                placeholder="e.g. Spotify Premium"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1"
              />
              <TangibleButton
                type="button"
                variant="secondary"
                onClick={handleAiAssist}
                disabled={isAiAssisting}
                className="shrink-0"
              >
                {isAiAssisting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                AI Assist
              </TangibleButton>
            </div>
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Cost and Billing Cycle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost (USD) *</Label>
              <TangibleInput
                id="cost"
                type="number"
                step="0.01"
                placeholder="9.99"
                value={formData.cost}
                onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
              />
              {errors.cost && <p className="text-sm text-destructive">{errors.cost}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle *</Label>
              <Select
                value={formData.billingCycle}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, billingCycle: value }))}
              >
                <SelectTrigger className="h-10 rounded-[10px] border-[1.5px] border-border shadow-[2px_2px_0px_hsl(var(--border))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="h-10 rounded-[10px] border-[1.5px] border-border shadow-[2px_2px_0px_hsl(var(--border))]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                <SelectItem value="productivity">📊 Productivity</SelectItem>
                <SelectItem value="software">💻 Software</SelectItem>
                <SelectItem value="fitness">💪 Fitness</SelectItem>
                <SelectItem value="education">📚 Education</SelectItem>
                <SelectItem value="other">📦 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this subscription..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="rounded-[10px] border-[1.5px] border-border shadow-[2px_2px_0px_hsl(var(--border))] min-h-[80px]"
            />
          </div>

          {/* Preview Card */}
          <AnimatePresence>
            {formData.name && formData.cost && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-[10px] border-[1.5px] border-border bg-accent-blue/20">
                  <p className="text-xs font-medium text-muted-foreground mb-2">👀 Preview:</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{formData.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{formData.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${formData.cost}</p>
                      <p className="text-xs text-muted-foreground">/ {formData.billingCycle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <TangibleButton
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </TangibleButton>
            <TangibleButton type="submit" className="flex-1">
              Add Subscription
            </TangibleButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
