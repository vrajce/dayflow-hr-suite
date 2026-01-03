import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, users } from '@/data/mockData';

interface AuthContextType {
  currentUser: User | null;
  viewAsRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, employeeId: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  setViewAsRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewAsRole, setViewAsRole] = useState<UserRole>('employee');

  const login = (email: string, password: string): boolean => {
    // Mock login - find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setViewAsRole(user.role);
      return true;
    }
    return false;
  };

  const signup = (name: string, employeeId: string, email: string, password: string, role: UserRole): boolean => {
    // Mock signup - in real app this would create a new user
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      phone: '',
      address: '',
      employeeId,
      jobTitle: role === 'admin' ? 'HR Manager' : 'Employee',
      department: role === 'admin' ? 'Human Resources' : 'General',
    };
    setCurrentUser(newUser);
    setViewAsRole(role);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setViewAsRole('employee');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      viewAsRole,
      isAuthenticated: !!currentUser,
      login,
      signup,
      logout,
      setViewAsRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
