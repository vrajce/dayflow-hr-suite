import { useState } from 'react';
import { users, salaryData, SalaryStructure } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PayrollManagement = () => {
  const [salaries, setSalaries] = useState<Record<string, SalaryStructure>>({ ...salaryData });
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editBasic, setEditBasic] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = (userId: string) => {
    setEditingUser(userId);
    setEditBasic(salaries[userId]?.basic || 0);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setSalaries(prev => ({
        ...prev,
        [editingUser]: {
          ...prev[editingUser],
          basic: editBasic,
        },
      }));
      toast({ title: 'Salary Updated', description: 'The salary structure has been updated.' });
      setIsDialogOpen(false);
      setEditingUser(null);
    }
  };

  const calculateNet = (salary: SalaryStructure) => {
    const earnings = salary.basic + salary.hra + salary.special;
    const deductions = salary.pf + salary.tax;
    return earnings - deductions;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payroll Management</h1>
        <p className="text-muted-foreground">Manage employee salary structures</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Salaries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Basic</TableHead>
                <TableHead className="text-right">HRA</TableHead>
                <TableHead className="text-right">Special</TableHead>
                <TableHead className="text-right">PF</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Net Payable</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const salary = salaries[user.id];
                if (!salary) return null;
                
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.employeeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">₹{salary.basic.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{salary.hra.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{salary.special.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">-₹{salary.pf.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">-₹{salary.tax.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      ₹{calculateNet(salary).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog open={isDialogOpen && editingUser === user.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleEditClick(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card">
                          <DialogHeader>
                            <DialogTitle>Edit Salary Structure</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-border">
                              <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.jobTitle}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="basic">Basic Salary</Label>
                              <Input
                                id="basic"
                                type="number"
                                value={editBasic}
                                onChange={(e) => setEditBasic(Number(e.target.value))}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Other components (HRA, Special Allowance, PF, Tax) are calculated automatically based on company policy.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSave}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollManagement;
