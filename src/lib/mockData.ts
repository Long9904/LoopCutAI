// Mock data for LoopCutAI demo

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

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Spotify Premium',
    cost: 10.99,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'entertainment',
    nextBillDate: '2025-11-05',
    description: 'Music streaming service',
    color: 'green',
  },
  {
    id: '2',
    name: 'Netflix Standard',
    cost: 15.49,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'entertainment',
    nextBillDate: '2025-10-23',
    description: 'Video streaming platform',
    color: 'coral',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    cost: 54.99,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'software',
    nextBillDate: '2025-11-12',
    description: 'Design and creative tools',
    color: 'pink',
  },
  {
    id: '4',
    name: 'Figma Professional',
    cost: 15.00,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'productivity',
    nextBillDate: '2025-10-28',
    description: 'Design collaboration platform',
    color: 'purple',
  },
  {
    id: '5',
    name: 'YouTube Premium',
    cost: 11.99,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'entertainment',
    nextBillDate: '2025-11-01',
    description: 'Ad-free video streaming',
    color: 'coral',
  },
  {
    id: '6',
    name: 'GitHub Pro',
    cost: 4.00,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'software',
    nextBillDate: '2025-11-08',
    description: 'Code hosting platform',
    color: 'blue',
  },
  {
    id: '7',
    name: 'Notion Plus',
    cost: 10.00,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'productivity',
    nextBillDate: '2025-10-25',
    description: 'Workspace and notes',
    color: 'yellow',
  },
];

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: "Alex's Finances",
    type: 'personal',
    subscriptions: ['1', '2', '3', '4', '5', '6', '7'],
  },
  {
    id: '2',
    name: 'Family Shared',
    type: 'family',
    subscriptions: ['2', '5'],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Upcoming Payment',
    message: 'Netflix Standard payment of $15.49 due in 3 days',
    date: '2025-10-20',
    read: false,
  },
  {
    id: '2',
    type: 'insight',
    title: 'AI Insight',
    message: 'Your Software spending has increased by 15% this month',
    date: '2025-10-19',
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Review Subscriptions',
    message: "You haven't used Figma in 30 days",
    date: '2025-10-18',
    read: true,
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Processed',
    message: 'Spotify Premium payment of $10.99 was successful',
    date: '2025-10-15',
    read: true,
  },
];

export const mockMonthlySpending = [
  { month: 'May', amount: 115.45 },
  { month: 'Jun', amount: 118.32 },
  { month: 'Jul', amount: 122.46 },
  { month: 'Aug', amount: 128.50 },
  { month: 'Sep', amount: 125.78 },
  { month: 'Oct', amount: 128.50 },
];

export const mockCategorySpending = [
  { category: 'Entertainment', value: 38.47, color: 'hsl(var(--accent-coral))' },
  { category: 'Software', value: 58.99, color: 'hsl(var(--accent-pink))' },
  { category: 'Productivity', value: 25.00, color: 'hsl(var(--accent-purple))' },
  { category: 'Fitness', value: 0, color: 'hsl(var(--accent-blue))' },
];
