import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Users, Search, CheckCircle2 } from 'lucide-react';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';

export function BuyersDashboardPage() {
  const buyers = [
    { id: '1', name: 'John Citizen', email: 'john@example.com', abssin: 'ABSS-89423', status: 'Verified (Auto)' },
    { id: '2', name: 'Alice Johnson', email: 'alice@example.com', abssin: 'ABSS-12345', status: 'Verified (Auto)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Buyers</h1>
        <p className="text-slate-500">Manage registered buyers and their verification status.</p>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search buyers by name or ABSSIN..." className="pl-9" />
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
                  <th className="px-6 py-4 font-medium" scope="col">ABSSIN</th>
                  <th className="px-6 py-4 font-medium" scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 font-semibold text-slate-600">
                        {buyer.name.charAt(0)}
                      </div>
                      {buyer.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{buyer.email}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{buyer.abssin}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                        {buyer.status}
                      </Badge>
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
