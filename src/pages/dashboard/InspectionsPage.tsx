import React from 'react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Calendar, MapPin, Filter, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';
import { Link } from 'react-router-dom';

import { useStore } from '@/src/store/useStore';

export function InspectionsPage() {
  const { currentUser } = useStore();
  const inspections = [
    { id: 1, buyer: 'Alice Johnson', property: 'Block A, Plot 14', estate: 'Sunrise Valley Estate', date: '2023-11-15T10:00:00', status: 'Upcoming' },
    { id: 2, buyer: 'Michael Smith', property: 'Block C, Plot 2', estate: 'Greenfields Housing', date: '2023-11-12T14:30:00', status: 'Completed' },
    { id: 3, buyer: 'Sarah Williams', property: 'Block B, Plot 7', estate: 'Riverside Enclave', date: '2023-11-10T09:00:00', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Site Inspections</h1>
          <p className="text-slate-500">Manage property viewing requests and schedules.</p>
        </div>
        {(currentUser?.role === 'operations' || currentUser?.role === 'admin') && (
          <Link to="/dashboard/inspections/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="h-4 w-4 mr-2" /> Schedule Inspection
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
              <Input aria-label="Search inspections" placeholder="Search inspections..." className="pl-9" />
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
                  <th className="px-6 py-4 font-medium" scope="col">Buyer</th>
                  <th className="px-6 py-4 font-medium" scope="col">Property Details</th>
                  <th className="px-6 py-4 font-medium" scope="col">Date & Time</th>
                  <th className="px-6 py-4 font-medium" scope="col">Status</th>
                  <th className="px-6 py-4 font-medium text-right" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inspections.map((inspection) => (
                  <tr key={inspection.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{inspection.buyer}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-slate-900">{inspection.property}</span>
                        <span className="flex items-center text-slate-600 text-xs"><MapPin className="h-3 w-3 mr-1" aria-hidden="true" /> {inspection.estate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-slate-400" aria-hidden="true" />
                        {new Date(inspection.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        inspection.status === 'Upcoming' ? 'default' : 
                        inspection.status === 'Completed' ? 'success' : 'destructive'
                      }>
                        {inspection.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {inspection.status === 'Upcoming' && (
                        <>
                          <Button aria-label={`Complete inspection for ${inspection.buyer}`} variant="ghost" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <CheckCircle2 className="h-4 w-4 mr-1" aria-hidden="true" /> Complete
                          </Button>
                          <Button aria-label={`Cancel inspection for ${inspection.buyer}`} variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <XCircle className="h-4 w-4 mr-1" aria-hidden="true" /> Cancel
                          </Button>
                        </>
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
