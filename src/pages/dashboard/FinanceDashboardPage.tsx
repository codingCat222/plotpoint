import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';

export function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Finance & Revenue</h1>
        <p className="text-slate-500">Government revenue tracking and financial oversight.</p>
      </div>

      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        <Card className="min-w-[240px] sm:min-w-0 shrink-0 sm:shrink">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Revenue YTD</p>
                <h3 className="text-2xl font-bold text-slate-900">₦2.4B</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[240px] sm:min-w-0 shrink-0 sm:shrink">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Growth</p>
                <h3 className="text-2xl font-bold text-slate-900">+14.5%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[240px] sm:min-w-0 shrink-0 sm:shrink">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Payments</p>
                <h3 className="text-2xl font-bold text-slate-900">₦450M</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-[240px] sm:min-w-0 shrink-0 sm:shrink">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Transactions</p>
                <h3 className="text-2xl font-bold text-slate-900">1,234</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-500">Detailed transaction history will be displayed here.</div>
        </CardContent>
      </Card>
    </div>
  );
}