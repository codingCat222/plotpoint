import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Users, Search, UserPlus, Shield, UserX } from 'lucide-react';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';

import { Link } from 'react-router-dom';

export function UsersDashboardPage() {
  const users = [
    { id: '1', name: 'Super Admin', email: 'admin@plotpoint.gov', role: 'admin', status: 'Active' },
    { id: '2', name: 'Gov Rep', email: 'rep@plotpoint.gov', role: 'executive', status: 'Active' },
    { id: '3', name: 'Sarah Sales', email: 'sarah@plotpoint.gov', role: 'sales_rep', status: 'Active' },
    { id: '4', name: 'Michael Boss', email: 'michael@plotpoint.gov', role: 'supervisor', status: 'Active' },
    { id: '5', name: 'Anna Ops', email: 'anna@plotpoint.gov', role: 'operations', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Users</h1>
          <p className="text-slate-500">Manage internal staff accounts and roles.</p>
        </div>
        <Link to="/dashboard/users/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <UserPlus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search users by name or email..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium" scope="col">Name</th>
                  <th className="px-6 py-4 font-medium" scope="col">Email</th>
                  <th className="px-6 py-4 font-medium" scope="col">Role</th>
                  <th className="px-6 py-4 font-medium" scope="col">Status</th>
                  <th className="px-6 py-4 font-medium text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center mr-3 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="capitalize flex w-fit items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.role !== 'admin' && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <UserX className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
