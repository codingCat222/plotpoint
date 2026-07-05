import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { CreditCard, Download, ArrowUpRight, Plus, FileText, CheckCircle2, AlertCircle, Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/src/store/useStore';
import { generateReceiptPDF } from '@/src/utils/receiptGenerator';

export function PaymentsPage() {
  const { currentUser } = useStore();
  const [isVerified, setIsVerified] = useState(true); 
  
  const buyerTransactions = [
    {
      id: 'TRX-982374',
      date: '2023-11-15',
      amount: 2500000,
      type: 'Initial Deposit',
      property: 'Plot 42, Sunrise Valley',
      status: 'completed',
      method: 'online'
    },
    {
      id: 'TRX-823746',
      date: '2023-12-15',
      amount: 1000000,
      type: 'Installment',
      property: 'Plot 42, Sunrise Valley',
      status: 'pending_verification',
      method: 'bank_transfer'
    },
    {
      id: 'TRX-482934',
      date: '2023-11-10',
      amount: 1500000,
      type: 'Installment',
      property: 'Plot 88, Aba South',
      status: 'rejected',
      method: 'bank_transfer'
    }
  ];

  const adminTransactions = [
    {
      id: 'TRX-823746',
      buyerName: 'John Citizen',
      date: '2023-12-15',
      amount: 1000000,
      property: 'Plot 42, Sunrise Valley',
      status: 'pending_verification',
      method: 'bank_transfer',
      receiptUrl: '#'
    },
    {
      id: 'TRX-982374',
      buyerName: 'John Citizen',
      date: '2023-11-15',
      amount: 2500000,
      property: 'Plot 42, Sunrise Valley',
      status: 'completed',
      method: 'online',
      receiptUrl: null
    },
    {
      id: 'TRX-482934',
      buyerName: 'Obinna Okafor',
      date: '2023-11-10',
      amount: 1500000,
      property: 'Plot 88, Aba South',
      status: 'rejected',
      method: 'bank_transfer',
      receiptUrl: '#'
    }
  ];

  if (currentUser?.role === 'operations' || currentUser?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Verification</h1>
          <p className="text-slate-500">Verify direct bank transfers and manage platform transactions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">Awaiting Verification</p>
              <h3 className="text-3xl font-bold text-amber-600 mt-2">12</h3>
              <p className="text-sm text-slate-500 mt-1">Direct bank transfers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">Verified Today</p>
              <h3 className="text-3xl font-bold text-emerald-600 mt-2">45</h3>
              <p className="text-sm text-slate-500 mt-1">Receipts generated</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">Platform Commission</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">₦4.5M</h3>
              <p className="text-sm text-emerald-600 mt-1">From verified payments</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Review and verify uploaded payment evidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Transaction ID</th>
                    <th className="px-4 py-3 font-medium">Buyer</th>
                    <th className="px-4 py-3 font-medium">Property</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{trx.id}</td>
                      <td className="px-4 py-3 text-slate-900">{trx.buyerName}</td>
                      <td className="px-4 py-3 text-slate-500">{trx.property}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">₦{trx.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 capitalize text-slate-500">{trx.method.replace('_', ' ')}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant={
                            trx.status === 'completed' || trx.status === 'verified'
                              ? 'success' 
                              : trx.status === 'pending_verification' 
                              ? 'warning' 
                              : trx.status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {trx.status === 'pending_verification' 
                            ? 'Awaiting Verification' 
                            : trx.status === 'completed' || trx.status === 'verified'
                            ? 'Verified'
                            : trx.status === 'rejected'
                            ? 'Rejected'
                            : trx.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {trx.status === 'pending_verification' ? (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => alert('View receipt modal')}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => alert('Payment Verified. Commission logic applied.')}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50" onClick={() => alert('Payment Rejected.')}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => generateReceiptPDF({
                              id: trx.id,
                              date: trx.date,
                              amount: trx.amount,
                              buyerName: trx.buyerName,
                              property: trx.property,
                              status: trx.status,
                              method: trx.method || 'offline'
                            })}
                          >
                            <Download className="h-4 w-4 mr-1" /> Receipt
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

  // Buyer View
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Payments</h1>
          <p className="text-slate-500">Track your payment history and upcoming installments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsVerified(!isVerified)}
            className="text-xs"
          >
            Toggle Verification (Demo)
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => window.open('https://flutterwave.com/pay', '_blank')}
            disabled={!isVerified}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" /> Make a Payment
          </Button>
        </div>
      </div>

      {!isVerified && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Identity Verification Required</h3>
            <p className="text-sm text-red-700 mt-1">
              You must complete your ABSSIN and Government ID verification before you can make any payments.
            </p>
            <Link to="/dashboard/settings">
              <Button variant="outline" size="sm" className="mt-3 bg-white text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800">
                Verify Identity Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${!isVerified ? 'opacity-60 pointer-events-none' : ''}`}>
        <Card className="bg-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 font-medium text-sm mb-1">Total Paid</p>
                <h3 className="text-3xl font-bold">₦3,500,000</h3>
              </div>
              <div className="p-2 bg-emerald-500 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-medium text-sm mb-1">Next Payment Due</p>
                <h3 className="text-3xl font-bold text-slate-900">₦1,000,000</h3>
                <p className="text-sm text-red-500 mt-2 font-medium">Due in 5 days</p>
              </div>
              <div className="p-2 bg-slate-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-slate-600" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-medium text-sm mb-1">Total Outstanding</p>
                <h3 className="text-3xl font-bold text-slate-900">₦4,000,000</h3>
              </div>
              <div className="p-2 bg-slate-100 rounded-lg">
                <FileText className="h-6 w-6 text-slate-600" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>A complete record of all your transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-medium" scope="col">Transaction ID</th>
                  <th className="px-4 py-3 font-medium" scope="col">Date</th>
                  <th className="px-4 py-3 font-medium" scope="col">Description</th>
                  <th className="px-4 py-3 font-medium" scope="col">Property</th>
                  <th className="px-4 py-3 font-medium" scope="col">Amount</th>
                  <th className="px-4 py-3 font-medium" scope="col">Status</th>
                  <th className="px-4 py-3 font-medium" scope="col">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buyerTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{trx.id}</td>
                    <td className="px-4 py-3 text-slate-500">{trx.date}</td>
                    <td className="px-4 py-3 text-slate-900">{trx.type}</td>
                    <td className="px-4 py-3 text-slate-500">{trx.property}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">₦{trx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={
                          trx.status === 'completed' || trx.status === 'verified'
                            ? 'success' 
                            : trx.status === 'pending_verification' 
                            ? 'warning' 
                            : trx.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {trx.status === 'pending_verification' 
                          ? 'Awaiting Verification' 
                          : trx.status === 'completed' || trx.status === 'verified'
                          ? 'Verified'
                          : trx.status === 'rejected'
                          ? 'Rejected'
                          : trx.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {trx.status === 'completed' || trx.status === 'verified' ? (
                        <Button 
                          aria-label={`Download PDF receipt for ${trx.id}`} 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => generateReceiptPDF({
                            id: trx.id,
                            date: trx.date,
                            amount: trx.amount,
                            type: trx.type,
                            buyerName: currentUser?.name || 'John Citizen',
                            property: trx.property,
                            status: trx.status,
                            method: trx.method
                          })}
                        >
                          <Download className="h-4 w-4 mr-1" aria-hidden="true" /> PDF
                        </Button>
                      ) : (
                        <Button 
                          aria-label={`Pay now for ${trx.id}`}
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => window.open('https://flutterwave.com/pay', '_blank')}
                          disabled={!isVerified}
                        >
                          Pay Now <ArrowUpRight className="h-3 w-3 ml-1" aria-hidden="true" />
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
