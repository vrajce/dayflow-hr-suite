import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Clock, 
  CalendarDays, 
  DollarSign,
  Users,
  CheckSquare,
  FileText,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  adminOnly?: boolean;
  employeeOnly?: boolean;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'My Profile', icon: User, href: '/profile' },
  { title: 'Attendance', icon: Clock, href: '/attendance' },
  { title: 'Leave', icon: CalendarDays, href: '/leave' },
  { title: 'Payroll', icon: DollarSign, href: '/payroll' },
  { title: 'Employee Directory', icon: Users, href: '/employees', adminOnly: true },
  { title: 'Leave Approvals', icon: CheckSquare, href: '/leave-approvals', adminOnly: true },
  { title: 'Payroll Management', icon: FileText, href: '/payroll-management', adminOnly: true },
];

export const AppSidebar = () => {
  const location = useLocation();
  const { viewAsRole, logout } = useAuth();

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly && viewAsRole !== 'admin') return false;
    if (item.employeeOnly && viewAsRole !== 'employee') return false;
    return true;
  });

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 sidebar-gradient">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">Dayflow</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
