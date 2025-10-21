import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AIChatbot } from "./components/AIchatbot";
import { LanguageProvider } from "./contexts/LanguageContext";

// Feature Pages
import { CustomizableDashboard } from "./features/dashboard/CustomizableDashboard";
import { SubscriptionsPage } from "./features/subscriptions/SubscriptionsPage";
import { CalendarPage } from "./features/calendar/CalendarPage";
import { ReportsPage } from "./features/reports/ReportsPage";
import { NotificationsPage } from "./features/notifications/NotificationsPage";
import { ProfilePage } from "./features/user-profile/ProfilePage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { PricingPage } from "./features/pricing/PricingPage";
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";
import { BudgetGoalsPage } from "./features/budget/BudgetGoalsPage";
import { AIInsightsPage } from "./features/insights/AIInsightsPage";
import { AIChatPage } from "./features/ai-chat/AIChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* App Routes (with layout) */}
          <Route
            path="/"
            element={
              <AppLayout>
                <CustomizableDashboard />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AppLayout>
                <SubscriptionsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/calendar"
            element={
              <AppLayout>
                <CalendarPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <ReportsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <AppLayout>
                <NotificationsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AppLayout>
                <ProfilePage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <SettingsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/budget"
            element={
              <AppLayout>
                <BudgetGoalsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/insights"
            element={
              <AppLayout>
                <AIInsightsPage />
                <AIChatbot />
              </AppLayout>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <AppLayout>
                <AIChatPage />
                <AIChatbot />
              </AppLayout>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
