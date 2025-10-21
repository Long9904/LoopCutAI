export interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  category: 'entertainment' | 'productivity' | 'software' | 'fitness' | 'education' | 'other';
  nextBillDate: string;
  description: string;
  logo?: string;
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'coral';
}

export interface Profile {
  id: string;
  name: string;
  type: 'personal' | 'family' | 'group';
  subscriptions: string[];
}

export interface Notification {
  id: string;
  type: 'payment' | 'insight' | 'reminder';
  title: string;
  message: string;
  date: string;
  read: boolean;
}
