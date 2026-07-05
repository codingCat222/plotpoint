import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Share2, Heart, Calendar, CreditCard, ChevronRight, CheckCircle2, Map as MapIcon, Timer, TrendingUp, Calculator, ChevronLeft, X, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useStore } from '@/src/store/useStore';
import { VirtualTour } from '@/src/components/VirtualTour';
import { MortgageCalculator } from '@/src/components/MortgageCalculator';
import { PropertyHistory } from '@/src/components/PropertyHistory';
import { PropertyReviews } from '@/src/components/PropertyReviews';
import { ScheduleVisit } from '@/src/components/ScheduleVisit';
import { PropertyCarousel } from '@/src/components/PropertyCarousel';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const backPath = isDashboard ? '/dashboard/marketplace' : '/properties';
  const { properties, reservations, reserveProperty, currentUser, favorites, addFavorite, removeFavorite } = useStore();
  const [isReserving, setIsReserving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState<'online' | 'bank_transfer' | null>(null);
  const [depositorName, setDepositorName] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentFileName, setPaymentFileName] = useState('');
  const [paymentDate, setPaymentDate] = useState('2026-07-04');
  const [paymentStage, setPaymentStage] = useState<'method' | 'form' | 'submitting' | 'success'>('method');
  
  const property = properties.find(p => p.id === id);

  const activeReservation = property?.status === 'reserved' 
    ? reservations.find(r => r.propertyId === property?.id && r.buyerId === currentUser?.id)
    : null;

  const isFavorite = currentUser ? favorites.some(f => f.propertyId === property?.id && f.buyerId === currentUser.id) : false;

  const toggleFavorite = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (isFavorite && property) {
      removeFavorite(property.id, currentUser.id);
    } else if (property) {
      addFavorite(property.id, currentUser.id);
    }
  };

  useEffect(() => {
    if (!activeReservation) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiresAt = new Date(activeReservation.expiresAt).getTime();
      const distance = expiresAt - now;

      if (distance < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [activeReservation]);

  if (!property) {
    return <div className="p-8 text-center">Property not found</div>;
  }

  const valuationData = [
    { year: '2020', value: property.price * 0.65 },
    { year: '2021', value: property.price * 0.72 },
    { year: '2022', value: property.price * 0.81 },
    { year: '2023', value: property.price * 0.90 },
    { year: '2024', value: property.price * 0.95 },
    { year: '2025', value: property.price },
  ];

  const handleReserve = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setIsReserving(true);
    setTimeout(() => {
      reserveProperty(property.id, currentUser.id);
      setIsReserving(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-[64px] z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to={backPath} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleFavorite} className={isFavorite ? 'text-red-500 hover:text-red-600' : ''}>
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} /> {isFavorite ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showSuccess && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-emerald-900">Reservation Successful!</h4>
              <p className="text-sm text-emerald-700 mt-1">
                You have successfully reserved this property. Please proceed to your dashboard to complete the payment within 48 hours.
              </p>
              <div className="mt-3">
                <Link to="/dashboard">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyCarousel 
              images={property.images} 
              videos={property.videos}
              type={property.type} 
              status={property.status} 
              title={property.title} 
            />

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">{property.title}</h1>
              <div className="flex items-center text-slate-500 text-base">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{property.estate}, {property.location}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-xl font-semibold mb-4">About this Property</h3>
              <p className="text-slate-600 leading-relaxed">
                This premium {property.type} allocation is part of the government's strategic development initiative in {property.location}. 
                Situated within the secure and well-planned {property.estate}, it offers excellent infrastructure including paved roads, 
                reliable power supply, and central water systems. Perfect for immediate development or long-term investment.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-emerald-600" />
                  Historical Valuation Trend
                </h3>
                <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full font-medium">+35% since 2020</span>
              </div>
              <div className="p-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={valuationData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}}
                      tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}m`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Valuation']}
                      labelStyle={{ color: '#64748b', marginBottom: 4 }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <PropertyHistory property={property} />

            <VirtualTour />

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900 flex items-center">
                  <MapIcon className="h-4 w-4 mr-2" />
                  GIS Location
                </h3>
                <Button variant="link" className="text-emerald-600 h-auto p-0">View Full Map</Button>
              </div>
              <div className="h-64 bg-slate-200 relative flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map view" className="w-full h-full object-cover opacity-50 grayscale" />
                <div className="absolute text-center bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200">
                  <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-900">Coordinates</p>
                  <p className="text-xs text-slate-500 font-mono mt-1">{property.coordinates.join(', ')}</p>
                </div>
              </div>
            </div>

            <div id="calculator">
              <MortgageCalculator propertyPrice={property.price} />
            </div>

            <PropertyReviews property={property} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <p className="text-sm text-slate-500 font-medium mb-1">Official Price</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">
                  ₦{property.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Plot Size</p>
                    <p className="font-semibold text-slate-900">{property.plotSize}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Property Type</p>
                    <p className="font-semibold text-slate-900 capitalize">{property.type}</p>
                  </div>
                </div>

                {property.status === 'available' ? (
                  <div className="space-y-3">
                    {currentUser?.role === 'operations' && (
                      <Button 
                        className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleReserve}
                        disabled={isReserving || showSuccess}
                      >
                        {isReserving ? 'Processing...' : 'Reserve for Buyer'}
                      </Button>
                    )}
                    {currentUser?.role === 'buyer' && (
                      <div className="space-y-3">
                        <Button 
                          className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => {
                            setPaymentOption('online');
                            setPaymentStage('form');
                            setShowPaymentModal(true);
                          }}
                        >
                          Buy Property Online
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full h-12 text-base font-semibold text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                          onClick={() => {
                            setPaymentOption('bank_transfer');
                            setPaymentStage('form');
                            setShowPaymentModal(true);
                          }}
                        >
                          Pay via Bank Transfer
                        </Button>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full" onClick={() => setShowSchedule(true)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Inspect
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Installment Plans
                      </Button>
                    </div>
                  </div>
                ) : activeReservation ? (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-amber-800 mb-1">Reservation Expires In</p>
                      <div className="flex items-center justify-center text-3xl font-bold text-amber-600 tracking-tight font-mono">
                        <Timer className="h-6 w-6 mr-2" />
                        {timeLeft}
                      </div>
                      <p className="text-xs text-amber-700 mt-2">Complete payment to secure allocation</p>
                    </div>
                    {currentUser?.role === 'buyer' && (
                      <div className="space-y-3">
                        <Button 
                          className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800"
                          onClick={() => {
                            setPaymentOption('online');
                            setPaymentStage('form');
                            setShowPaymentModal(true);
                          }}
                        >
                          Checkout Online
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full h-12 text-base font-semibold text-slate-700"
                          onClick={() => {
                            setPaymentOption('bank_transfer');
                            setPaymentStage('form');
                            setShowPaymentModal(true);
                          }}
                        >
                          Upload Bank Receipt
                        </Button>
                      </div>
                    )}
                    {currentUser?.role === 'operations' && (
                      <Button variant="outline" className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                        Cancel Reservation
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button className="w-full h-12 text-base font-semibold" disabled variant="secondary">
                    Currently Unavailable
                  </Button>
                )}
              </div>

              <div className="bg-slate-50 p-6">
                <h4 className="font-semibold text-sm mb-3">Payment Plans Available</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-900">Outright Payment</span>
                      <p className="text-slate-500 text-xs mt-0.5">Pay in full and receive documents immediately.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-900">12-Month Installment</span>
                      <p className="text-slate-500 text-xs mt-0.5">30% down payment, spread balance over 12 months.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSchedule && (
        <ScheduleVisit property={property} onClose={() => setShowSchedule(false)} />
      )}
      
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold text-lg">Property Checkout</h3>
                <p className="text-xs text-slate-300 mt-1">{property.title}</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {paymentStage === 'form' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Selected Method</p>
                      <p className="font-semibold text-slate-900 mt-0.5">
                        {paymentOption === 'online' ? 'Online Portal Gateway' : 'Offline Bank Transfer'}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setPaymentOption(paymentOption === 'online' ? 'bank_transfer' : 'online');
                      }}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Change Method
                    </button>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Property Amount:</span>
                      <span className="font-semibold text-slate-900">₦{property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2 pt-2 border-t border-emerald-100 font-medium">
                      <span className="text-slate-800">Payment Due:</span>
                      <span className="text-emerald-700 font-bold">₦{property.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {paymentOption === 'online' ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500">
                        You will be routed to the secure payment portal. Instant verification and allocation receipt generation.
                      </p>
                      <div className="space-y-2 mt-4">
                        <label className="block text-xs font-semibold text-slate-600 uppercase">Card Holder Name</label>
                        <input 
                          type="text" 
                          defaultValue={currentUser?.name}
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-600 uppercase">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4000 1234 5678 9010" 
                          maxLength={19}
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-mono" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-600 uppercase">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM / YY" 
                            className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm text-center font-mono" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-600 uppercase">CVV</label>
                          <input 
                            type="password" 
                            placeholder="•••" 
                            maxLength={3}
                            className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm text-center font-mono" 
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          setPaymentStage('submitting');
                          setTimeout(() => {
                            setPaymentStage('success');
                          }, 2000);
                        }}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 mt-4 text-white font-semibold"
                      >
                        Authorize & Pay Online (Flutterwave)
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3 font-mono text-xs">
                        <div className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px] border-b border-white/10 pb-1.5">
                          OFFICIAL REVENUE BANK ACCOUNT
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bank:</span>
                          <span className="text-white font-bold">Zenith Bank Plc</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Account Name:</span>
                          <span className="text-white font-bold text-right">Abia State Ministry of Lands and Housing</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Account Number:</span>
                          <span className="text-emerald-400 font-bold text-sm tracking-widest">1014298105</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Branch:</span>
                          <span className="text-white">Secretariat Branch, Umuahia</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Depositor / Transferor Name</label>
                          <input 
                            type="text" 
                            placeholder="John Citizen" 
                            value={depositorName}
                            onChange={(e) => setDepositorName(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Transfer Reference / Bank Transaction ID</label>
                          <input 
                            type="text" 
                            placeholder="TXN918239120" 
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-mono" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Payment Date</label>
                          <input 
                            type="date" 
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Upload Receipt Image / PDF</label>
                          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50 relative">
                            <input 
                              type="file" 
                              accept="image/*,application/pdf"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setPaymentFileName(e.target.files[0].name);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            />
                            <div className="space-y-1 text-slate-500">
                              <FileText className="h-8 w-8 mx-auto text-slate-400" />
                              <p className="text-xs font-medium">
                                {paymentFileName ? (
                                  <span className="text-emerald-600 font-semibold">{paymentFileName}</span>
                                ) : (
                                  <span>Drag & drop receipt here, or <span className="text-emerald-600 underline">browse</span></span>
                                )}
                              </p>
                              <p className="text-[10px]">JPEG, PNG or PDF up to 5MB</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={() => {
                          if (!depositorName || !transactionRef || !paymentFileName) {
                            alert("Please fill in depositor name, transaction reference and upload a receipt image/PDF.");
                            return;
                          }
                          setPaymentStage('submitting');
                          setTimeout(() => {
                            setPaymentStage('success');
                          }, 2000);
                        }}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 mt-4 text-white font-semibold"
                      >
                        Submit Evidence of Payment
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {paymentStage === 'submitting' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-900 text-base">Processing Payment Request</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {paymentOption === 'online' 
                        ? 'Verifying bank gateway response...' 
                        : 'Uploading payment evidence securely to server...'}
                    </p>
                  </div>
                </div>
              )}

              {paymentStage === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900">
                      {paymentOption === 'online' ? 'Payment Completed!' : 'Evidence Uploaded!'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-2 max-w-sm">
                      {paymentOption === 'online' 
                        ? 'Your transaction was successfully processed by Flutterwave. Your plot allocation documents have been generated.'
                        : 'Your bank transfer evidence has been successfully submitted. Our Operations Desk will verify and update your status.'}
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full text-left font-mono text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction ID:</span>
                      <span className="text-slate-900 font-semibold">{paymentOption === 'online' ? 'FLW-82931-ABIA' : 'BANK-REF-9283-AB'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Verification:</span>
                      <span className={paymentOption === 'online' ? "text-emerald-600 font-bold uppercase" : "text-amber-600 font-bold uppercase"}>
                        {paymentOption === 'online' ? 'Instant / Verified' : 'Awaiting Operations Desk'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full pt-4">
                    <Button 
                      onClick={() => {
                        setShowPaymentModal(false);
                        setPaymentStage('method');
                        setDepositorName('');
                        setTransactionRef('');
                        setPaymentFileName('');
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      Close Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}