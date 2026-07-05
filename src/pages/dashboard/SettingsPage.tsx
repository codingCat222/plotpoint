import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { User, Mail, Phone, MapPin, Bell, Shield, Key } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

export function SettingsPage() {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  if (!currentUser) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Profile & Settings</h1>
        <p className="text-slate-500">Manage your account details and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 space-y-1 shrink-0" role="tablist" aria-label="Settings Tabs">
          <button
            role="tab"
            aria-selected={activeTab === 'profile'}
            aria-controls="panel-profile"
            id="tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              activeTab === 'profile' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <User className="h-4 w-4" aria-hidden="true" />
            Profile Information
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'notifications'}
            aria-controls="panel-notifications"
            id="tab-notifications"
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              activeTab === 'notifications' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            Notifications
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'security'}
            aria-controls="panel-security"
            id="tab-security"
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              activeTab === 'security' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Shield className="h-4 w-4" aria-hidden="true" />
            Security & Privacy
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <Card id="panel-profile" role="tabpanel" aria-labelledby="tab-profile">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold" aria-hidden="true">
                    {currentUser.name.charAt(0)}
                  </div>
                  <Button variant="outline">Change Avatar</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        id="fullName"
                        type="text" 
                        defaultValue={currentUser.name}
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="emailAddress" className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        id="emailAddress"
                        type="email" 
                        defaultValue={currentUser.email}
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        id="phoneNumber"
                        type="tel" 
                        defaultValue="+234 800 000 0000"
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-slate-700">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        id="location"
                        type="text" 
                        defaultValue="Lagos, Nigeria"
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Identity Verification</h4>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="abssin" className="text-sm font-medium text-slate-700">ABSSIN Number</label>
                        <input 
                          id="abssin"
                          type="text" 
                          placeholder="Enter your ABSSIN"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="govId" className="text-sm font-medium text-slate-700">Government ID (NIN, BVN, etc.)</label>
                        <input 
                          id="govId"
                          type="text" 
                          placeholder="Enter Government ID Number"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">
                      Note: Your ABSSIN and Government ID must be verified before you can schedule inspections or make payments.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card id="panel-notifications" role="tabpanel" aria-labelledby="tab-notifications">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'New Properties', desc: 'Get notified when new properties match your criteria.', id: 'notif-new-prop' },
                  { title: 'Payment Reminders', desc: 'Receive reminders for upcoming installment payments.', id: 'notif-pay' },
                  { title: 'Document Updates', desc: 'Alerts when your property documents are ready or approved.', id: 'notif-docs' },
                  { title: 'Marketing & Offers', desc: 'Promotional emails, discounts, and newsletters.', id: 'notif-marketing' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <h4 id={`${item.id}-label`} className="text-sm font-medium text-slate-900">{item.title}</h4>
                      <p id={`${item.id}-desc`} className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 3} aria-labelledby={`${item.id}-label`} aria-describedby={`${item.id}-desc`} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" aria-hidden="true"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card id="panel-security" role="tabpanel" aria-labelledby="tab-security">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-900">Change Password</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        type="password" 
                        aria-label="Current Password"
                        placeholder="Current Password"
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      <input 
                        type="password" 
                        aria-label="New Password"
                        placeholder="New Password"
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h4>
                  <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-500">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
