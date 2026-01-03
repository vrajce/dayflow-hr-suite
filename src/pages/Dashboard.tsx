import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CalendarDays, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { users, attendanceRecords, leaveRequests, getPendingLeaves } from '@/data/mockData';

export const Dashboard = () => {
  const { viewAsRole, currentUser } = useAuth();

  if (viewAsRole === 'admin') {
    return <AdminDashboard />;
  }

  return <EmployeeDashboard />;
};

const AdminDashboard = () => {
  const totalEmployees = users.length;
  const presentToday = attendanceRecords.filter(
    a => a.date === new Date().toISOString().split('T')[0] && a.status === 'Present'
  ).length;
  const pendingLeaves = getPendingLeaves().length;

  const stats = [
    { title: 'Total Employees', value: totalEmployees, icon: Users, color: 'text-primary' },
    { title: 'Present Today', value: presentToday, icon: CheckCircle, color: 'text-success' },
    { title: 'Pending Leaves', value: pendingLeaves, icon: CalendarDays, color: 'text-warning' },
    { title: 'Avg. Attendance', value: '92%', icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your organization</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getPendingLeaves().slice(0, 3).map((leave) => {
                const user = users.find(u => u.id === leave.userId);
                return (
                  <div key={leave.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user?.avatar} 
                        alt={user?.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{leave.type} • {leave.days} days</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning font-medium">
                      Pending
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <button className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Manage Employees</p>
                <p className="text-xs text-muted-foreground">View and edit employee profiles</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Review Leave Requests</p>
                <p className="text-xs text-muted-foreground">{getPendingLeaves().length} pending approvals</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Process Payroll</p>
                <p className="text-xs text-muted-foreground">Run monthly payroll</p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.find(
    a => a.userId === currentUser?.id && a.date === todayStr
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, {currentUser?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Status</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {todayAttendance?.checkIn ? (
                <span className="text-success">Checked In</span>
              ) : (
                <span className="text-muted-foreground">Not Checked In</span>
              )}
            </div>
            {todayAttendance?.checkIn && (
              <p className="text-xs text-muted-foreground mt-1">Since {todayAttendance.checkIn}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Days present</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payday</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Jan 31</div>
            <p className="text-xs text-muted-foreground">28 days away</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
            <Clock className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium">Mark Attendance</p>
              <p className="text-xs text-muted-foreground">Check in/out for today</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
            <CalendarDays className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium">Apply Leave</p>
              <p className="text-xs text-muted-foreground">Submit a leave request</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
            <DollarSign className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium">View Payslip</p>
              <p className="text-xs text-muted-foreground">Download salary slip</p>
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
