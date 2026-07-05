import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, UserRole } from '@/src/store/useStore';

export function AddUserPage() {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  const addUser = useStore((state) => state.addUser);

  const isAdmin = currentUser?.role === 'admin';

  const roleOptions: { value: UserRole; label: string }[] = isAdmin
    ? [
        { value: 'operations', label: 'Operations Administrator' },
        { value: 'executive', label: 'Government Representative' },
        { value: 'admin', label: 'Super Administrator' },
      ]
    : [
        { value: 'operations', label: 'Operations Administrator' },
      ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: roleOptions[0].value as UserRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin && formData.role !== 'operations') {
      alert('You are not permitted to assign this role.');
      return;
    }

    addUser({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: 'password123',
      role: formData.role,
    });

    navigate('/dashboard/users');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/users">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add System User</h1>
          <p className="text-slate-500">Create a new internal staff account.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Enter the staff information and assign their role.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <Input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <Input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@plotpoint.gov" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {roleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {!isAdmin && (
                <p className="text-xs text-slate-400">Only Super Administrators can assign Executive or Admin roles.</p>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link to="/dashboard/users">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <UserPlus className="h-4 w-4 mr-2" /> Create User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}