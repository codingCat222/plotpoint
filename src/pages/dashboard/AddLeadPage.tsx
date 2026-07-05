import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ArrowLeft, Save, User, Mail, Phone, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function AddLeadPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/leads');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard/leads" aria-label="Back to Leads">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Lead</h1>
          <p className="text-slate-500">Register a new prospective buyer in the system.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>Enter the basic contact details for this lead.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input id="firstName" className="pl-9" placeholder="Enter first name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input id="lastName" className="pl-9" placeholder="Enter last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input id="email" type="email" className="pl-9" placeholder="e.g. name@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <Input id="phone" type="tel" className="pl-9" placeholder="e.g. +234 800 000 0000" required />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="propertyInterest" className="text-sm font-medium text-slate-700">Property of Interest</label>
                <div className="relative">
                  <Home className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <select 
                    id="propertyInterest" 
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                  >
                    <option value="">Select a property...</option>
                    <option value="1">Sunrise Valley Estate - Block A, Plot 14</option>
                    <option value="2">Greenfields Housing - Block C, Plot 2</option>
                    <option value="3">Riverside Enclave - Block B, Plot 7</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="text-sm font-medium text-slate-700">Initial Notes</label>
                <textarea 
                  id="notes" 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm min-h-[100px]"
                  placeholder="Add any additional context or preferences..."
                ></textarea>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-xl">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/leads')}>Cancel</Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              {isSubmitting ? 'Saving...' : 'Save Lead'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
