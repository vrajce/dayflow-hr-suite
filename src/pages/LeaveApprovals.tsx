import { useState } from 'react';
import { leaveRequests, users, LeaveRequest } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const LeaveApprovals = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(
    leaveRequests.filter(l => l.status === 'Pending')
  );

  const handleApprove = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({ title: 'Leave Approved', description: 'The leave request has been approved.' });
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({ 
      title: 'Leave Rejected', 
      description: 'The leave request has been rejected.',
      variant: 'destructive'
    });
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">Rejected</Badge>;
      case 'Pending':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leave Approvals</h1>
        <p className="text-muted-foreground">Review and manage pending leave requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((leave) => {
                  const user = users.find(u => u.id === leave.userId);
                  return (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={user?.avatar} 
                            alt={user?.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.fromDate}</TableCell>
                      <TableCell>{leave.toDate}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                      <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                            onClick={() => handleApprove(leave.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(leave.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No pending leave requests
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

export default LeaveApprovals;
