import { useNavigate } from 'react-router-dom';
import { users } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';

export const EmployeeDirectory = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employee Directory</h1>
        <p className="text-muted-foreground">Manage all employees in your organization</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-muted"
              />
              <h3 className="font-semibold text-lg text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{user.jobTitle}</p>
              <p className="text-xs text-primary mb-4">{user.department}</p>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/profile/${user.id}?edit=true`)}
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
