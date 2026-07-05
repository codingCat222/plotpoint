import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { ArrowLeft, Mail, Phone, Calendar, Clock, MapPin, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/src/components/ui/Badge';

export function LeadDetailsPage() {
  const { id } = useParams();

  // Mock data for the lead
  const lead = {
    id: id || 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+234 800 111 2222',
    status: 'Contacted',
    interest: 'Sunrise Valley Estate',
    dateAdded: '2023-10-25',
    abssinStatus: 'Unverified'
  };

  const activityLog = [
    { id: 1, type: 'call', date: '2023-10-26T10:30:00', note: 'Called to discuss property features. Expressed high interest.' },
    { id: 2, type: 'email', date: '2023-10-25T14:15:00', note: 'Sent initial welcome email with property brochure.' },
    { id: 3, type: 'status_change', date: '2023-10-25T09:00:00', note: 'Lead created in system.' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/leads" aria-label="Back to Leads">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{lead.name}</h1>
            <p className="text-slate-500">Lead Details & Activity</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700">
            Convert to Buyer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-500 shrink-0">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-slate-500">Email Address</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-500 shrink-0">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Phone Number</p>
                  <p className="text-sm font-medium text-slate-900">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-500 shrink-0">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Date Added</p>
                  <p className="text-sm font-medium text-slate-900">{new Date(lead.dateAdded).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="pt-4 mt-2 border-t border-slate-100">
                <Badge variant="warning" className="w-full justify-center py-1">
                  ABSSIN: {lead.abssinStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle>Property Interest</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{lead.interest}</p>
                  <p className="text-xs text-slate-500 mt-1">High potential for conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent interactions with this lead.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" /> Add Note
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {activityLog.map((activity, index) => (
                  <div key={activity.id} className="relative pl-6 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {index !== activityLog.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-4 border-white flex items-center justify-center ${
                      activity.type === 'call' ? 'bg-blue-500' :
                      activity.type === 'email' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}>
                      {activity.type === 'call' && <Phone className="h-2.5 w-2.5 text-white" />}
                      {activity.type === 'email' && <Mail className="h-2.5 w-2.5 text-white" />}
                      {activity.type === 'status_change' && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900 capitalize">
                          {activity.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                          {new Date(activity.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{activity.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
