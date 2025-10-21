import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    subscriptions: 'Subscriptions',
    calendar: 'Calendar',
    reports: 'Reports',
    budgetGoals: 'Budget Goals',
    aiInsights: 'AI Insights',
    aiChat: 'AI Chat',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    
    // Dashboard
    yourSubscriptionOverview: 'Your subscription overview',
    dragDropCustomize: '🎨 Drag & drop widgets to customize',
    customize: 'Customize',
    done: 'Done',
    resetLayout: 'Reset Layout',
    editModeDisabled: 'Edit mode disabled',
    editModeEnabled: 'Edit mode enabled - drag widgets to reorder',
    dashboardResetSuccess: 'Dashboard reset to default layout',
    widgetPositionUpdated: 'Widget position updated',
    
    // Subscriptions
    manageSubscriptions: 'Manage all your subscriptions in one place',
    addSubscription: 'Add Subscription',
    searchSubscriptions: 'Search subscriptions...',
    all: 'All',
    entertainment: 'Entertainment',
    productivity: 'Productivity',
    software: 'Software',
    fitness: 'Fitness',
    education: 'Education',
    noSubscriptionsFound: 'No subscriptions found',
    addFirstSubscription: 'Add Your First Subscription',
    edit: 'Edit',
    delete: 'Delete',
    nextBill: 'Next bill',
    noTags: 'No tags',
    editTags: 'Edit Tags',
    addTags: 'Add tags (press Enter)...',
    deleted: 'Deleted',
    
    // Common
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
  },
  vi: {
    // Navigation
    dashboard: 'Trang Chủ',
    subscriptions: 'Đăng Ký',
    calendar: 'Lịch',
    reports: 'Báo Cáo',
    budgetGoals: 'Mục Tiêu Ngân Sách',
    aiInsights: 'Thông Tin AI',
    aiChat: 'Trò Chuyện AI',
    notifications: 'Thông Báo',
    profile: 'Hồ Sơ',
    settings: 'Cài Đặt',
    language: 'Ngôn Ngữ',
    theme: 'Giao Diện',
    light: 'Sáng',
    dark: 'Tối',
    
    // Dashboard
    yourSubscriptionOverview: 'Tổng quan đăng ký của bạn',
    dragDropCustomize: '🎨 Kéo thả để tùy chỉnh',
    customize: 'Tùy Chỉnh',
    done: 'Xong',
    resetLayout: 'Đặt Lại Bố Cục',
    editModeDisabled: 'Đã tắt chế độ chỉnh sửa',
    editModeEnabled: 'Đã bật chế độ chỉnh sửa - kéo thả để sắp xếp lại',
    dashboardResetSuccess: 'Đã đặt lại bố cục mặc định',
    widgetPositionUpdated: 'Đã cập nhật vị trí widget',
    
    // Subscriptions
    manageSubscriptions: 'Quản lý tất cả đăng ký ở một nơi',
    addSubscription: 'Thêm Đăng Ký',
    searchSubscriptions: 'Tìm kiếm đăng ký...',
    all: 'Tất Cả',
    entertainment: 'Giải Trí',
    productivity: 'Năng Suất',
    software: 'Phần Mềm',
    fitness: 'Thể Dục',
    education: 'Giáo Dục',
    noSubscriptionsFound: 'Không tìm thấy đăng ký',
    addFirstSubscription: 'Thêm Đăng Ký Đầu Tiên',
    edit: 'Sửa',
    delete: 'Xóa',
    nextBill: 'Hóa đơn tiếp theo',
    noTags: 'Không có thẻ',
    editTags: 'Sửa Thẻ',
    addTags: 'Thêm thẻ (nhấn Enter)...',
    deleted: 'Đã xóa',
    
    // Common
    search: 'Tìm kiếm',
    save: 'Lưu',
    cancel: 'Hủy',
    close: 'Đóng',
  },
  ja: {
    // Navigation
    dashboard: 'ダッシュボード',
    subscriptions: 'サブスクリプション',
    calendar: 'カレンダー',
    reports: 'レポート',
    budgetGoals: '予算目標',
    aiInsights: 'AI インサイト',
    aiChat: 'AI チャット',
    notifications: '通知',
    profile: 'プロフィール',
    settings: '設定',
    language: '言語',
    theme: 'テーマ',
    light: 'ライト',
    dark: 'ダーク',
    
    // Dashboard
    yourSubscriptionOverview: 'サブスクリプションの概要',
    dragDropCustomize: '🎨 ドラッグ＆ドロップでカスタマイズ',
    customize: 'カスタマイズ',
    done: '完了',
    resetLayout: 'レイアウトをリセット',
    editModeDisabled: '編集モードを無効化',
    editModeEnabled: '編集モードを有効化 - ドラッグして並べ替え',
    dashboardResetSuccess: 'デフォルトレイアウトにリセットしました',
    widgetPositionUpdated: 'ウィジェットの位置を更新しました',
    
    // Subscriptions
    manageSubscriptions: 'すべてのサブスクリプションを一箇所で管理',
    addSubscription: 'サブスクリプション追加',
    searchSubscriptions: 'サブスクリプションを検索...',
    all: 'すべて',
    entertainment: 'エンターテイメント',
    productivity: '生産性',
    software: 'ソフトウェア',
    fitness: 'フィットネス',
    education: '教育',
    noSubscriptionsFound: 'サブスクリプションが見つかりません',
    addFirstSubscription: '最初のサブスクリプションを追加',
    edit: '編集',
    delete: '削除',
    nextBill: '次回請求',
    noTags: 'タグなし',
    editTags: 'タグ編集',
    addTags: 'タグを追加（Enterキー）...',
    deleted: '削除しました',
    
    // Common
    search: '検索',
    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
