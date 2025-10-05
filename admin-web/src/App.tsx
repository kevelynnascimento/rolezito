import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersLandingPage from "./pages/UsersLandingPage";
import AffiliatesLandingPage from "./pages/AffiliatesLandingPage";
import StoreLandingPage from "./pages/StoreLandingPage";
import NotFound from "./pages/NotFound";
import AppHome from "./pages/AppHome";
import DiscoverPage from "./pages/app/DiscoverPage";
import FavoritesPage from "./pages/app/FavoritesPage";
import ProfilePage from "./pages/app/ProfilePage";
import PlaceDetailPage from "./pages/app/PlaceDetailPage";
import NotificationsPage from "./pages/app/NotificationsPage";
import AdminLayout from "./components/admin/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import StoresPage from "./pages/admin/StoresPage";
import AffiliatesAdminPage from "./pages/admin/AffiliatesAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import UserGroupsPage from "./pages/admin/UserGroupsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ScrollToTop só para rotas do app */}
          <Routes>
            <Route path="/" element={<UsersLandingPage />} />
            <Route path="/affiliates" element={<AffiliatesLandingPage />} />
            <Route path="/stores" element={<StoreLandingPage />} />
            <Route path="/app" element={<><ScrollToTop /><AppHome /></>}>
              <Route index element={<DiscoverPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="place/:id" element={<PlaceDetailPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="stores" element={<StoresPage />} />
              <Route path="affiliates" element={<AffiliatesAdminPage />} />
              <Route path="users" element={<UsersAdminPage />} />
              <Route path="user-groups" element={<UserGroupsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
