import React, { useState } from 'react';
import { useStore } from '@/src/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Users, CreditCard, TrendingUp, Map, Calendar, FileText, Clock, Shield, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { Badge } from '@/src/components/ui/Badge';

const mockChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
];

export function DashboardHome() {
  const { currentUser, reservations, properties } = useStore();
  
  if (currentUser?.role === 'executive') {
    return <ExecutiveDashboard />;
  }

  const isBuyer = currentUser?.role === 'buyer';

  const userReservations = reservations.filter(r => r.buyerId === currentUser?.id);

  const buyerActivities = (() => {
    const list: Array<{
      title: string;
      desc: string;
      time: string;
      icon: React.ComponentType<{ className?: string }>;
      color: string;
      bg: string;
    }> = [];

    userReservations.forEach(res => {
      const prop = properties.find(p => p.id === res.propertyId);
      if (prop) {
        if (res.status === 'approved') {
          list.push({
            title: 'Reservation Approved',
            desc: `Your reservation for ${prop.title} (${prop.estate}) has been approved. Awaiting deposit.`,
            time: '1 day ago',
            icon: Check,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 text-emerald-600'
          });
        } else if (res.status === 'pending') {
          list.push({
            title: 'Reservation Placed & Pending',
            desc: `Your plot hold for ${prop.title} is currently under document audit.`,
            time: 'Just now',
            icon: Clock,
            color: 'text-amber-500',
            bg: 'bg-amber-50 text-amber-600'
          });
        } else {
          list.push({
            title: 'Reservation Status Update',
            desc: `Status update received for reservation ${res.id} (${prop.title}).`,
            time: '2 days ago',
            icon: Calendar,
            color: 'text-blue-500',
            bg: 'bg-blue-50 text-blue-600'
          });
        }
      }
    });

    list.push({
      title: 'Identity Document Verified',
      desc: 'Abia State Social Security Number (ABSSIN) successfully matched.',
      time: '2 days ago',
      icon: Shield,
      color: 'text-blue-500',
      bg: 'bg-blue-50 text-blue-600'
    });

    list.push({
      title: 'Government ID Approved',
      desc: 'National identity document verified by Ministry of Lands.',
      time: '3 days ago',
      icon: FileText,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 text-indigo-600'
    });

    list.push({
      title: 'Initial Land Deposit Paid',
      desc: 'Initial downpayment of ₦2,500,000 confirmed in State Treasury Single Account (TSA).',
      time: '5 days ago',
      icon: CreditCard,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 text-emerald-600'
    });

    return list;
  })();

  if (isBuyer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {currentUser?.name}</h1>
          <p className="text-slate-500">Manage your properties, reservations, and documents.</p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Properties</CardTitle>
              <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-slate-500">Allocated properties</p>
            </CardContent>
          </Card>
          <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userReservations.length}</div>
              <p className="text-xs text-slate-500">Pending payment/approval</p>
            </CardContent>
          </Card>
          <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦2,500,000</div>
              <p className="text-xs text-slate-500">Towards plot allocations</p>
            </CardContent>
          </Card>
          <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-slate-500">2 verified, 1 pending</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Account & Reservation Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {buyerActivities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 pb-4 last:pb-0 last:border-none border-b border-slate-100">
                    <div className={`p-2 rounded-lg ${activity.bg} shrink-0`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-none mb-1 text-slate-900">{activity.title}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activity.desc}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/dashboard/marketplace" className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                    <Map className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-slate-900">Explore Properties</span>
                </Link>
                <Link to="/dashboard/documents" className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-slate-900">Upload Documents</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'audit_logs'>('overview');

  const auditLogs = [
    {
      id: "LOG-4829",
      timestamp: "2026-07-04 15:30",
      user: "Operations Desk",
      actionType: "Payment Verification",
      details: "Verified bank transfer payment of ₦1,000,000 from John Citizen for Plot 42, Sunrise Valley (Umuahia).",
      status: "Verified"
    },
    {
      id: "LOG-4828",
      timestamp: "2026-07-04 12:15",
      user: "System Auto-Verification",
      actionType: "ID Check (ABSSIN API)",
      details: "Successfully verified ABSSIN & National ID for John Citizen (Automatic verification).",
      status: "Auto-Verified"
    },
    {
      id: "LOG-4827",
      timestamp: "2026-07-03 16:45",
      user: "Super Admin",
      actionType: "User Management",
      details: "Updated user role for Nduka Obi to Operations Administrator.",
      status: "Success"
    },
    {
      id: "LOG-4826",
      timestamp: "2026-07-03 14:00",
      user: "Operations Desk",
      actionType: "Payment Verification",
      details: "Rejected direct bank transfer of ₦500,000 from Obinna Okafor for Plot 88, Aba. Reason: Incomplete receipt upload.",
      status: "Rejected"
    },
    {
      id: "LOG-4825",
      timestamp: "2026-07-02 11:20",
      user: "System Auto-Verification",
      actionType: "ID Check (ABSSIN API)",
      details: "Successfully verified ABSSIN & Government ID for Jane Smith (Automatic verification).",
      status: "Auto-Verified"
    },
    {
      id: "LOG-4824",
      timestamp: "2026-07-01 09:30",
      user: "Super Admin",
      actionType: "Property Management",
      details: "Configured allocation layout and map links for House Model A on Plot 15, Aba South.",
      status: "Success"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {currentUser?.name}</h1>
          <p className="text-slate-500">Here's what's happening with your properties today.</p>
        </div>
        
        {(currentUser?.role === 'operations' || currentUser?.role === 'admin') && (
          <div className="flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === 'audit_logs'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Clock className="h-4 w-4" />
              Audit Logs
            </button>
          </div>
        )}
      </div>

      {activeTab === 'audit_logs' && (currentUser?.role === 'operations' || currentUser?.role === 'admin') ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-500" />
              System Audit Logs
            </CardTitle>
            <p className="text-sm text-slate-500">Chronological history of administrative actions, user verifications, and payment approvals.</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Log ID</th>
                    <th className="px-4 py-3 font-medium">Timestamp</th>
                    <th className="px-4 py-3 font-medium">User / Actor</th>
                    <th className="px-4 py-3 font-medium">Action Type</th>
                    <th className="px-4 py-3 font-medium">Action Details</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-900">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.id}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{log.user}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-800 hover:bg-slate-100">
                          {log.actionType}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600 min-w-[250px]">{log.details}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            log.status === "Verified" || log.status === "Success"
                              ? "success"
                              : log.status === "Auto-Verified"
                              ? "success"
                              : log.status === "Rejected"
                              ? "destructive"
                              : "default"
                          }
                          className={log.status === "Auto-Verified" ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200" : ""}
                        >
                          {log.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦45,231.89m</div>
                <p className="text-xs text-slate-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Properties Sold</CardTitle>
                <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-slate-500">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                <Users className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-slate-500">+19% from last month</p>
              </CardContent>
            </Card>
            <Card className="min-w-[220px] sm:min-w-0 shrink-0 sm:shrink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Inventory</CardTitle>
                <Map className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-slate-500">-2% since yesterday</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}} 
                        contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                      />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { title: 'Payment received', desc: '₦5,000,000 for Plot 42, Block B', time: '2 hours ago', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                    { title: 'New lead assigned', desc: 'John Doe interested in Sunrise Valley', time: '4 hours ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { title: 'Property reserved', desc: 'Plot 12, Phase 1 reserved by Sarah Smith', time: '5 hours ago', icon: Building2, color: 'text-amber-500', bg: 'bg-amber-100' },
                    { title: 'Allocation approved', desc: 'Documents generated for Plot 8', time: '1 day ago', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${activity.bg}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none mb-1">{activity.title}</p>
                        <p className="text-sm text-slate-500">{activity.desc}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}