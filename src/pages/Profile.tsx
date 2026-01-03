import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserById, users } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  
  // If viewing specific user (admin) or own profile
  const targetUser = userId ? getUserById(userId) : currentUser;
  
  const [phone, setPhone] = useState(targetUser?.phone || '');
  const [address, setAddress] = useState(targetUser?.address || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!targetUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {userId ? `${targetUser.name}'s Profile` : 'My Profile'}
        </h1>
        <p className="text-muted-foreground">View and update profile information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Left Pane - Photo */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="w-40 h-40 rounded-full object-cover ring-4 ring-muted mx-auto"
              />
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{targetUser.name}</h2>
            <p className="text-sm text-primary font-medium">{targetUser.jobTitle}</p>
            <p className="text-sm text-muted-foreground">{targetUser.department}</p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Employee ID</p>
              <p className="text-sm font-medium">{targetUser.employeeId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Right Pane - Form */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={targetUser.name}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={targetUser.email}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Current Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your current address"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input value={targetUser.jobTitle} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input value={targetUser.department} disabled className="bg-muted" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
