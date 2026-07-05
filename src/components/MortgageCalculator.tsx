import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Calculator } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termYears, setTermYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(5.5); // Default local government rate

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const principal = propertyPrice - downPayment;
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  // Total number of payments
  const numPayments = termYears * 12;

  // Mortgage calculation formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
        <Calculator className="h-4 w-4 mr-2 text-emerald-600" />
        <h3 className="font-semibold text-slate-900">Installment Calculator</h3>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property Price
              </label>
              <div className="w-full h-10 px-3 flex items-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 font-medium">
                ₦{propertyPrice.toLocaleString()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-emerald-600 font-semibold">₦{downPayment.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                <span>Loan Term (Years)</span>
                <span>{termYears} Years</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                <span>Gov. Interest Rate (%)</span>
                <span>{interestRate}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex flex-col justify-center text-center">
            <h4 className="text-emerald-800 font-medium mb-2">Estimated Monthly Payment</h4>
            <div className="text-4xl font-bold text-emerald-600 tracking-tight mb-4">
              ₦{Math.round(monthlyPayment).toLocaleString()}
            </div>
            
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex justify-between border-b border-emerald-200/50 pb-2">
                <span className="text-emerald-700">Principal Loan</span>
                <span className="font-semibold text-emerald-900">₦{principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200/50 pb-2">
                <span className="text-emerald-700">Total Interest</span>
                <span className="font-semibold text-emerald-900">₦{Math.round((monthlyPayment * numPayments) - principal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-emerald-700">Total Cost</span>
                <span className="font-semibold text-emerald-900">₦{Math.round(monthlyPayment * numPayments + downPayment).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
