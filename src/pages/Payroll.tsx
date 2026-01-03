import { useAuth } from '@/contexts/AuthContext';
import { getSalaryByUserId } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Payroll = () => {
  const { currentUser } = useAuth();
  const salary = currentUser ? getSalaryByUserId(currentUser.id) : null;

  if (!salary) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Salary information not found</p>
      </div>
    );
  }

  const totalEarnings = salary.basic + salary.hra + salary.special;
  const totalDeductions = salary.pf + salary.tax;
  const netPayable = totalEarnings - totalDeductions;

  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payroll</h1>
          <p className="text-muted-foreground">View your salary slip</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader className="text-center border-b border-border">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle>Salary Slip</CardTitle>
          </div>
          <p className="text-lg font-medium text-foreground">{currentMonth}</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground">Employee Name</p>
              <p className="font-medium">{currentUser?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>
              <p className="font-medium">{currentUser?.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{currentUser?.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Designation</p>
              <p className="font-medium">{currentUser?.jobTitle}</p>
            </div>
          </div>

          {/* Earnings & Deductions */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Earnings */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Basic Salary</span>
                  <span className="font-medium">₹{salary.basic.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HRA</span>
                  <span className="font-medium">₹{salary.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Special Allowance</span>
                  <span className="font-medium">₹{salary.special.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Earnings</span>
                  <span className="text-success">₹{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Deductions</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provident Fund (PF)</span>
                  <span className="font-medium">₹{salary.pf.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Professional Tax</span>
                  <span className="font-medium">₹{salary.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Deductions</span>
                  <span className="text-destructive">₹{totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Payable */}
          <div className="mt-8 pt-6 border-t-2 border-primary">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-foreground">Net Payable</span>
              <span className="text-3xl font-bold text-primary">
                ₹{netPayable.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;
