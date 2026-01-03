import { useLocation } from 'react-router-dom';
import { ChevronRight, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const routeNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/profile': 'My Profile',
  '/attendance': 'Attendance',
  '/leave': 'Leave Management',
  '/payroll': 'Payroll',
  '/employees': 'Employee Directory',
  '/leave-approvals': 'Leave Approvals',
  '/payroll-management': 'Payroll Management',
};

export const AppHeader = () => {
  const location = useLocation();
  const { currentUser, viewAsRole, setViewAsRole } = useAuth();
  
  const currentPage = routeNames[location.pathname] || 'Dashboard';

  const handleRoleToggle = (checked: boolean) => {
    setViewAsRole(checked ? 'admin' : 'employee');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border">
      <div className="flex h-full items-center justify-between px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Home</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{currentPage}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Role Switcher - only show if user is admin */}
          {currentUser?.role === 'admin' && (
            <div className="flex items-center gap-3 border-r border-border pr-6">
              <Label 
                htmlFor="role-switch" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                View as Employee
              </Label>
              <Switch
                id="role-switch"
                checked={viewAsRole === 'admin'}
                onCheckedChange={handleRoleToggle}
              />
              <Label 
                htmlFor="role-switch" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                View as Admin
              </Label>
            </div>
          )}

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{viewAsRole}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card">
              <DropdownMenuItem className="cursor-pointer">My Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
