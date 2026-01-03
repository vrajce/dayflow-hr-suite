import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import LeaveApprovals from "./pages/LeaveApprovals";
import Payroll from "./pages/Payroll";
import PayrollManagement from "./pages/PayrollManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
            <Route path="/profile/:userId" element={<AppLayout><Profile /></AppLayout>} />
            <Route path="/employees" element={<AppLayout><EmployeeDirectory /></AppLayout>} />
            <Route path="/attendance" element={<AppLayout><Attendance /></AppLayout>} />
            <Route path="/leave" element={<AppLayout><Leave /></AppLayout>} />
            <Route path="/leave-approvals" element={<AppLayout><LeaveApprovals /></AppLayout>} />
            <Route path="/payroll" element={<AppLayout><Payroll /></AppLayout>} />
            <Route path="/payroll-management" element={<AppLayout><PayrollManagement /></AppLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
