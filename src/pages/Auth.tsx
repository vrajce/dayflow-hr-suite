import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Building2, User, Mail, Phone, Lock } from 'lucide-react';

export const Auth = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Dayflow
          </span>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-4 text-sm font-semibold transition-all ${
                activeTab === 'signin'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-4 text-sm font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'signin' ? (
              <SignInForm onSuccess={() => navigate('/dashboard')} login={login} onSwitchTab={() => setActiveTab('signup')} />
            ) : (
              <SignUpForm onSuccess={() => navigate('/dashboard')} signup={signup} onSwitchTab={() => setActiveTab('signin')} />
            )}
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Demo: Use <span className="font-medium text-slate-700">sarah.mitchell@dayflow.com</span>
        </p>
      </div>
    </div>
  );
};

interface SignInFormProps {
  onSuccess: () => void;
  login: (email: string, password: string) => boolean;
  onSwitchTab: () => void;
}

const SignInForm = ({ onSuccess, login, onSwitchTab }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="signin-email" className="text-slate-700 font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signin-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signin-password" className="text-slate-700 font-medium">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signin-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-11 pr-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-all" 
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchTab} className="text-indigo-600 font-semibold hover:underline">
          Sign Up
        </button>
      </p>
    </form>
  );
};

interface SignUpFormProps {
  onSuccess: () => void;
  signup: (companyName: string, name: string, email: string, phone: string, password: string, role: UserRole) => boolean;
  onSwitchTab: () => void;
}

const SignUpForm = ({ onSuccess, signup, onSwitchTab }: SignUpFormProps) => {
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role] = useState<UserRole>('employee');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({ 
        title: 'Passwords do not match', 
        description: 'Please make sure both passwords are the same.', 
        variant: 'destructive' 
      });
      return;
    }

    if (password.length < 6) {
      toast({ 
        title: 'Password too short', 
        description: 'Password must be at least 6 characters.', 
        variant: 'destructive' 
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = signup(companyName, name, email, phone, password, role);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-company" className="text-slate-700 font-medium">Company Name</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-company"
            type="text"
            placeholder="Your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-slate-700 font-medium">Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-slate-700 font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-phone" className="text-slate-700 font-medium">Phone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-slate-700 font-medium">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-11 pr-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm" className="text-slate-700 font-medium">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="signup-confirm"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-11 pr-11 h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-all mt-2" 
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchTab} className="text-indigo-600 font-semibold hover:underline">
          Sign In
        </button>
      </p>
    </form>
  );
};

export default Auth;
