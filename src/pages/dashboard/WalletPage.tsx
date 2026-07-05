import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Wallet, ArrowDownRight, ArrowUpRight, DollarSign, History } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

export function WalletPage() {
  const { currentUser } = useStore();
  const transactions = [
    { id: 1, type: 'credit', amount: 50000, description: 'Commission for Block A, Plot 14', date: '2023-11-20', status: 'Completed' },
    { id: 2, type: 'debit', amount: 20000, description: 'Withdrawal to Bank Account', date: '2023-11-18', status: 'Completed' },
    { id: 3, type: 'credit', amount: 75000, description: 'Commission for Block C, Plot 2', date: '2023-11-15', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Wallet & Commissions</h1>
        <p className="text-slate-500">Track your earnings and withdraw funds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-600 text-white border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/20 rounded-lg">
                <Wallet className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-emerald-100 text-sm font-medium">Available Balance</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-1">₦105,000</h2>
              <p className="text-emerald-100 text-sm">Last updated: Today</p>
            </div>
            {currentUser?.role === 'operations' || currentUser?.role === 'admin' ? (
              <div className="mt-6">
                <Button className="w-full bg-white text-emerald-700 hover:bg-emerald-50">
                  Withdraw Funds
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <DollarSign className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Earnings</p>
                <h3 className="text-2xl font-bold text-slate-900">₦450,000</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <History className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Pending Clearance</p>
                <h3 className="text-2xl font-bold text-slate-900">₦25,000</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Expected in 2 days
            </div>
          </CardContent>
        </Card>
      </div>

      {currentUser?.role === 'operations' || currentUser?.role === 'admin' ? (
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent commissions and withdrawals.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tx.type === 'credit' ? <ArrowDownRight className="h-4 w-4" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{tx.description}</p>
                      <p className="text-sm text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
