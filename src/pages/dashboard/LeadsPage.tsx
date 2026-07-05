import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Plus, Filter, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';
import { Link } from 'react-router-dom';

export function LeadsPage() {
  const leads = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+234 800 111 2222', status: 'New', interest: 'Sunrise Valley Estate' },
    { id: 2, name: 'Michael Smith', email: 'michael@example.com', phone: '+234 800 333 4444', status: 'Contacted', interest: 'Greenfields Housing' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+234 800 555 6666', status: 'Qualified', interest: 'Riverside Enclave' },
    { id: 4, name: 'David Brown', email: 'david@example.com', phone: '+234 800 777 8888', status: 'Converted', interest: 'Sunrise Valley Estate' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads Management</h1>
          <p className="text-slate-500">Track and manage potential buyers and inquiries.</p>
        </div>
        <Link to="/dashboard/leads/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" /> Add Lead
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input aria-label="Search leads" placeholder="Search leads..." className="pl-9" />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" aria-hidden="true" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium" scope="col">Lead Name</th>
                  <th className="px-6 py-4 font-medium" scope="col">Contact</th>
                  <th className="px-6 py-4 font-medium" scope="col">Property Interest</th>
                  <th className="px-6 py-4 font-medium" scope="col">Status</th>
                  <th className="px-6 py-4 font-medium text-right" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-slate-600"><Mail className="h-3 w-3 mr-1" aria-hidden="true" /> {lead.email}</span>
                        <span className="flex items-center text-slate-600"><Phone className="h-3 w-3 mr-1" aria-hidden="true" /> {lead.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.interest}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        lead.status === 'New' ? 'default' : 
                        lead.status === 'Contacted' ? 'warning' : 
                        lead.status === 'Qualified' ? 'success' : 'secondary'
                      }>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/dashboard/leads/${lead.id}`}>
                        <Button aria-label={`Actions for ${lead.name}`} variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </Link>
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
