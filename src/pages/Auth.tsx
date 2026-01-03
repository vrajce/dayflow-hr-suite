import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export const Auth = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Dayflow</span>
        </div>

        <Card className="border-border shadow-lg">
          <Tabs defaultValue="signin" className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="signin">
              <SignInForm onSuccess={() => navigate('/dashboard')} login={login} />
            </TabsContent>

            <TabsContent value="signup">
              <SignUpForm onSuccess={() => navigate('/dashboard')} signup={signup} />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo credentials */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Demo: Use any email from the system (e.g., sarah.mitchell@dayflow.com)
        </p>
      </div>
    </div>
  );
};

interface SignInFormProps {
  onSuccess: () => void;
  login: (email: string, password: string) => boolean;
}

const SignInForm = ({ onSuccess, login }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = login(email, password);
    setIsLoading(false);
    
    if (success) {
      toast({ title: 'Welcome back!', description: 'Successfully signed in.' });
      onSuccess();
    } else {
      toast({ 
        title: 'Sign in failed', 
        description: 'Invalid email or password.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </CardContent>
  );
};

interface SignUpFormProps {
  onSuccess: () => void;
  signup: (name: string, employeeId: string, email: string, password: string, role: UserRole) => boolean;
}

const SignUpForm = ({ onSuccess, signup }: SignUpFormProps) => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = signup(name, employeeId, email, password, role);
    setIsLoading(false);
    
    if (success) {
      toast({ title: 'Account created!', description: 'Welcome to Dayflow.' });
      onSuccess();
    } else {
      toast({ 
        title: 'Sign up failed', 
        description: 'Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-empid">Employee ID</Label>
          <Input
            id="signup-empid"
            type="text"
            placeholder="DF006"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <div className="flex rounded-lg border border-input overflow-hidden">
            <button
              type="button"
              onClick={() => setRole('employee')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                role === 'employee'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                role === 'admin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              HR/Admin
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </CardContent>
  );
};

export default Auth;
