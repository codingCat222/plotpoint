import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ArrowLeft, Calendar, Clock, MapPin, User, Save, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/src/components/ui/Badge';

export function ScheduleInspectionPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buyerVerified, setBuyerVerified] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState('');

  // Mock buyer database to simulate verification check
  const buyers = [
    { id: '1', name: 'Alice Johnson', isVerified: true, abssin: 'ABSS-123456' },
    { id: '2', name: 'Bob Smith', isVerified: false, abssin: 'Pending' },
    { id: '3', name: 'Charlie Davis', isVerified: true, abssin: 'ABSS-987654' },
  ];

  const handleBuyerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buyerId = e.target.value;
    setSelectedBuyer(buyerId);
    
    if (buyerId) {
      const buyer = buyers.find(b => b.id === buyerId);
      setBuyerVerified(buyer?.isVerified || false);
    } else {
      setBuyerVerified(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerVerified) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/inspections');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard/inspections" aria-label="Back to Inspections">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Schedule Site Inspection</h1>
          <p className="text-slate-500">Book a property viewing for a registered buyer.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
            <CardDescription>Select the buyer and property to schedule an inspection.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-4 p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Buyer Selection</h3>
              
              <div className="space-y-2">
                <label htmlFor="buyerSelect" className="text-sm font-medium text-slate-700">Select Registered Buyer <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <select 
                    id="buyerSelect"
                    value={selectedBuyer}
                    onChange={handleBuyerSelect}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                    required
                  >
                    <option value="">Select a buyer...</option>
                    {buyers.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedBuyer && (
                <div className={`p-3 rounded-lg border ${buyerVerified ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} flex items-start gap-3`}>
                  {buyerVerified ? (
                    <div className="flex items-center text-emerald-700 text-sm">
                      <Badge variant="success" className="mr-2">Verified</Badge>
                      ABSSIN ID and Government ID verified. Eligible for inspection.
                    </div>
                  ) : (
                    <div className="flex items-start text-red-700 text-sm">
                      <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Verification Required</p>
                        <p className="text-red-600 mt-1">This buyer's ABSSIN or Government ID has not been verified yet. Inspections cannot be scheduled for unverified buyers.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`space-y-6 ${!buyerVerified && selectedBuyer ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-2">
                <label htmlFor="propertyInterest" className="text-sm font-medium text-slate-700">Property to Inspect <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                  <select 
                    id="propertyInterest" 
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                    required={buyerVerified}
                  >
                    <option value="">Select a property...</option>
                    <option value="1">Sunrise Valley Estate - Block A, Plot 14</option>
                    <option value="2">Greenfields Housing - Block C, Plot 2</option>
                    <option value="3">Riverside Enclave - Block B, Plot 7</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="inspectionDate" className="text-sm font-medium text-slate-700">Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <Input id="inspectionDate" type="date" className="pl-9" required={buyerVerified} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="inspectionTime" className="text-sm font-medium text-slate-700">Time <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <Input id="inspectionTime" type="time" className="pl-9" required={buyerVerified} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-slate-700">Additional Notes</label>
                <textarea 
                  id="notes" 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm min-h-[100px]"
                  placeholder="Any specific requests or requirements for the viewing..."
                ></textarea>
              </div>
            </div>
            
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-xl">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/inspections')}>Cancel</Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700" 
              disabled={isSubmitting || !buyerVerified || !selectedBuyer}
            >
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              {isSubmitting ? 'Scheduling...' : 'Schedule Inspection'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
