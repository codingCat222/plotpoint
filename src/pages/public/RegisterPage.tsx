import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { User, Mail, Phone, Lock, Building2, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    abssin: '',
    govIdType: 'NIN',
    govId: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate validation and API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock login as a new buyer
      setCurrentUser({
        id: `buyer-${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'buyer'
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <div className="h-2 w-full bg-emerald-600"></div>
        <CardHeader className="text-center pb-6">
          <div className="mx-auto bg-emerald-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </CardTitle>
          <CardDescription className="text-slate-500 mt-2">
            Register to start your property investment journey with PlotPoint.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-8 flex items-center justify-center space-x-4 text-sm font-medium">
            <div className={`flex items-center ${step === 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-2 ${step === 1 ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300'}`}>
                {step > 1 ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : '1'}
              </span>
              Profile
            </div>
            <div className="h-px w-8 bg-slate-200"></div>
            <div className={`flex items-center ${step === 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-2 ${step === 2 ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300'}`}>
                2
              </span>
              Verification
            </div>
          </div>

          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input name="firstName" required value={formData.firstName} onChange={handleChange} className="pl-9" placeholder="John" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input name="lastName" required value={formData.lastName} onChange={handleChange} className="pl-9" placeholder="Doe" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input name="email" type="email" required value={formData.email} onChange={handleChange} className="pl-9" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="pl-9" placeholder="+234 800 000 0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input name="password" type="password" required value={formData.password} onChange={handleChange} className="pl-9" placeholder="Create a password" />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6 h-11 text-base">
                  Continue to Verification
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 mb-6 text-sm text-emerald-800">
                  To complete your registration and unlock full features, please provide your verified ABSSIN and a valid Government ID.
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">ABSSIN Number</label>
                  <Input name="abssin" required value={formData.abssin} onChange={handleChange} placeholder="Enter ABSSIN ID" />
                  <p className="text-xs text-slate-500">Your Abia State Social Identity Number</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gov. ID Type</label>
                    <select 
                      name="govIdType" 
                      value={formData.govIdType} 
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    >
                      <option value="NIN">NIN</option>
                      <option value="BVN">BVN</option>
                      <option value="DriversLicense">Driver's License</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">ID Number</label>
                    <Input name="govId" required value={formData.govId} onChange={handleChange} placeholder={`Enter ${formData.govIdType}`} />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button type="button" variant="outline" className="w-1/3 h-11" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="w-2/3 bg-emerald-600 hover:bg-emerald-700 h-11 text-base" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Complete Registration'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center bg-slate-50 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
