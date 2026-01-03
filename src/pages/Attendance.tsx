import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAttendanceByUserId, AttendanceRecord } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Square, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Attendance = () => {
  const { currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Update clock every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const history = getAttendanceByUserId(currentUser.id);
      setAttendanceHistory(history);
      
      // Check if already checked in today
      const todayStr = new Date().toISOString().split('T')[0];
      const todayRecord = history.find(r => r.date === todayStr);
      if (todayRecord?.checkIn && !todayRecord?.checkOut) {
        setIsCheckedIn(true);
        setCheckInTime(todayRecord.checkIn);
      }
    }
  }, [currentUser]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const handleCheckIn = () => {
    const time = formatTime(new Date());
    setIsCheckedIn(true);
    setCheckInTime(time);
    toast({ title: 'Checked In', description: `You checked in at ${time}` });
  };

  const handleCheckOut = () => {
    const time = formatTime(new Date());
    setIsCheckedIn(false);
    setCheckInTime(null);
    toast({ title: 'Checked Out', description: `You checked out at ${time}` });
  };

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'Present':
        return <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">Present</Badge>;
      case 'Absent':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">Absent</Badge>;
      case 'Half-day':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">Half-day</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">Track your daily attendance</p>
      </div>

      {/* Punch Clock */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Date & Time Display */}
            <div className="text-center md:text-left">
              <p className="text-lg text-muted-foreground">{formatDate(currentTime)}</p>
              <p className="text-5xl font-bold text-foreground tabular-nums">
                {formatTime(currentTime)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-4">
              {!isCheckedIn ? (
                <Button 
                  size="lg" 
                  className="bg-success hover:bg-success/90 text-success-foreground gap-2 px-8"
                  onClick={handleCheckIn}
                >
                  <Play className="h-5 w-5" />
                  Check In
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="gap-2 px-8"
                  onClick={handleCheckOut}
                >
                  <Square className="h-5 w-5" />
                  Check Out
                </Button>
              )}
              
              {isCheckedIn && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">
                    You are currently marked Present (since {checkInTime})
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In Time</TableHead>
                <TableHead>Check Out Time</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>{record.checkIn || '-'}</TableCell>
                    <TableCell>{record.checkOut || '-'}</TableCell>
                    <TableCell>{record.workHours || '-'}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No attendance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
