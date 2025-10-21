import { create } from 'zustand';
import { Subscription, Profile, Notification } from '@/types';
import { mockSubscriptions, mockProfiles, mockNotifications } from '@/lib/mockData';

interface AppState {
  subscriptions: Subscription[];
  profiles: Profile[];
  notifications: Notification[];
  currentProfile: Profile;
  setCurrentProfile: (profile: Profile) => void;
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  subscriptions: mockSubscriptions,
  profiles: mockProfiles,
  notifications: mockNotifications,
  currentProfile: mockProfiles[0],
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  addSubscription: (subscription) =>
    set((state) => {
      // Add to subscriptions array
      const newSubscriptions = [...state.subscriptions, subscription];
      // Add to current profile's subscriptions if not already there
      if (!state.currentProfile.subscriptions.includes(subscription.id)) {
        state.currentProfile.subscriptions.push(subscription.id);
      }
      return { subscriptions: newSubscriptions };
    }),
  updateSubscription: (id, updates) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, ...updates } : sub
      ),
    })),
  deleteSubscription: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    })),
}));
