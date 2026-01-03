// Mock Data for Dayflow HRMS

export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  address: string;
  employeeId: string;
  jobTitle: string;
  department: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: string | null;
  status: 'Present' | 'Absent' | 'Half-day';
}

export interface SalaryStructure {
  basic: number;
  hra: number;
  special: number;
  pf: number;
  tax: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: 'Sick Leave' | 'Casual Leave' | 'Earned Leave';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

// Users Data
export const users: User[] = [
  {
    id: 'u1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@dayflow.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 123-4567',
    address: '123 Corporate Lane, Suite 500, San Francisco, CA 94102',
    employeeId: 'DF001',
    jobTitle: 'HR Manager',
    department: 'Human Resources',
  },
  {
    id: 'u2',
    name: 'James Wilson',
    email: 'james.wilson@dayflow.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 234-5678',
    address: '456 Tech Boulevard, Apt 12B, San Francisco, CA 94103',
    employeeId: 'DF002',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
  },
  {
    id: 'u3',
    name: 'Emily Chen',
    email: 'emily.chen@dayflow.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 345-6789',
    address: '789 Innovation Drive, San Francisco, CA 94104',
    employeeId: 'DF003',
    jobTitle: 'Product Designer',
    department: 'Design',
  },
  {
    id: 'u4',
    name: 'Michael Brown',
    email: 'michael.brown@dayflow.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 456-7890',
    address: '321 Market Street, Floor 8, San Francisco, CA 94105',
    employeeId: 'DF004',
    jobTitle: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: 'u5',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@dayflow.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 567-8901',
    address: '654 Financial District, San Francisco, CA 94106',
    employeeId: 'DF005',
    jobTitle: 'Financial Analyst',
    department: 'Finance',
  },
];

// Helper to get dates
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Attendance Data (last 7 days for each user)
export const attendanceRecords: AttendanceRecord[] = [
  // User 2 - James Wilson
  { id: 'a1', userId: 'u2', date: getDateString(0), checkIn: '09:05', checkOut: null, workHours: null, status: 'Present' },
  { id: 'a2', userId: 'u2', date: getDateString(1), checkIn: '08:55', checkOut: '18:10', workHours: '9h 15m', status: 'Present' },
  { id: 'a3', userId: 'u2', date: getDateString(2), checkIn: '09:30', checkOut: '14:00', workHours: '4h 30m', status: 'Half-day' },
  { id: 'a4', userId: 'u2', date: getDateString(3), checkIn: '09:00', checkOut: '18:00', workHours: '9h 0m', status: 'Present' },
  { id: 'a5', userId: 'u2', date: getDateString(4), checkIn: null, checkOut: null, workHours: null, status: 'Absent' },
  { id: 'a6', userId: 'u2', date: getDateString(5), checkIn: '08:45', checkOut: '17:45', workHours: '9h 0m', status: 'Present' },
  { id: 'a7', userId: 'u2', date: getDateString(6), checkIn: '09:10', checkOut: '18:30', workHours: '9h 20m', status: 'Present' },
  
  // User 3 - Emily Chen
  { id: 'a8', userId: 'u3', date: getDateString(0), checkIn: '08:50', checkOut: null, workHours: null, status: 'Present' },
  { id: 'a9', userId: 'u3', date: getDateString(1), checkIn: '09:00', checkOut: '17:30', workHours: '8h 30m', status: 'Present' },
  { id: 'a10', userId: 'u3', date: getDateString(2), checkIn: '09:15', checkOut: '18:00', workHours: '8h 45m', status: 'Present' },
  { id: 'a11', userId: 'u3', date: getDateString(3), checkIn: null, checkOut: null, workHours: null, status: 'Absent' },
  { id: 'a12', userId: 'u3', date: getDateString(4), checkIn: '08:30', checkOut: '17:00', workHours: '8h 30m', status: 'Present' },
  { id: 'a13', userId: 'u3', date: getDateString(5), checkIn: '09:00', checkOut: '13:30', workHours: '4h 30m', status: 'Half-day' },
  { id: 'a14', userId: 'u3', date: getDateString(6), checkIn: '08:45', checkOut: '17:45', workHours: '9h 0m', status: 'Present' },
];

// Salary Structure per user
export const salaryData: Record<string, SalaryStructure> = {
  u1: { basic: 75000, hra: 30000, special: 10000, pf: 2700, tax: 500 },
  u2: { basic: 60000, hra: 24000, special: 8000, pf: 2160, tax: 400 },
  u3: { basic: 55000, hra: 22000, special: 7000, pf: 1980, tax: 350 },
  u4: { basic: 50000, hra: 20000, special: 5000, pf: 1800, tax: 200 },
  u5: { basic: 65000, hra: 26000, special: 9000, pf: 2340, tax: 450 },
};

// Leave Requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: 'l1',
    userId: 'u2',
    type: 'Sick Leave',
    fromDate: '2026-01-06',
    toDate: '2026-01-07',
    days: 2,
    reason: 'Fever and flu symptoms',
    status: 'Pending',
    appliedOn: '2026-01-02',
  },
  {
    id: 'l2',
    userId: 'u3',
    type: 'Casual Leave',
    fromDate: '2026-01-10',
    toDate: '2026-01-10',
    days: 1,
    reason: 'Personal appointment',
    status: 'Approved',
    appliedOn: '2025-12-28',
  },
  {
    id: 'l3',
    userId: 'u4',
    type: 'Earned Leave',
    fromDate: '2026-01-15',
    toDate: '2026-01-20',
    days: 6,
    reason: 'Family vacation',
    status: 'Pending',
    appliedOn: '2026-01-01',
  },
  {
    id: 'l4',
    userId: 'u5',
    type: 'Sick Leave',
    fromDate: '2025-12-20',
    toDate: '2025-12-21',
    days: 2,
    reason: 'Doctor appointment and recovery',
    status: 'Approved',
    appliedOn: '2025-12-18',
  },
  {
    id: 'l5',
    userId: 'u2',
    type: 'Casual Leave',
    fromDate: '2025-12-25',
    toDate: '2025-12-26',
    days: 2,
    reason: 'Holiday travel',
    status: 'Rejected',
    appliedOn: '2025-12-15',
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => users.find(u => u.id === id);

export const getAttendanceByUserId = (userId: string): AttendanceRecord[] => 
  attendanceRecords.filter(a => a.userId === userId);

export const getLeavesByUserId = (userId: string): LeaveRequest[] => 
  leaveRequests.filter(l => l.userId === userId);

export const getSalaryByUserId = (userId: string): SalaryStructure | undefined => 
  salaryData[userId];

export const getPendingLeaves = (): LeaveRequest[] => 
  leaveRequests.filter(l => l.status === 'Pending');
