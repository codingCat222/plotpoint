import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Building2, MapPin, Users, Target, Eye } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

const values = [
  {
    icon: ShieldCheck,
    title: 'Transparency',
    description: 'Every listing is verified directly by the Ministry of Lands and Housing, with clear title status and documentation.',
  },
  {
    icon: Building2,
    title: 'Accessibility',
    description: 'A single digital portal for citizens and diaspora to browse, evaluate, and purchase government property from anywhere.',
  },
  {
    icon: MapPin,
    title: 'Accuracy',
    description: 'Our GIS mapping technology gives buyers a precise, real view of boundaries, terrain, and surrounding infrastructure.',
  },
  {
    icon: Users,
    title: 'Service',
    description: 'A dedicated support and operations team guides every buyer through inspection, payment, and allocation.',
  },
];

const stats = [
  { value: '5k+', label: 'Properties Available' },
  { value: '12', label: 'States Covered' },
  { value: '24', label: 'Featured Estates' },
  { value: '100%', label: 'Secure & Verified' },
];

export function About() {
  return (
    <div>
      <section className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2070&auto=format&fit=crop"
            alt="Government building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/50" />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Building Trust in Government Property Ownership
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            The Abia State Ministry of Lands and Housing created this portal to give every citizen and diaspora buyer a transparent, secure, and modern way to own government land and housing.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Who We Are</h2>
              <p className="text-slate-500 mb-4">
                This portal is an initiative of the Abia State Ministry of Lands and Housing, established to digitize and simplify how government-owned land and housing is allocated to the public.
              </p>
              <p className="text-slate-500 mb-4">
                For decades, acquiring government property meant long queues, paper files, and uncertainty. We built this platform to change that — combining verified listings, interactive GIS mapping, and secure digital payments into one seamless experience.
              </p>
              <p className="text-slate-500">
                Whether you live in Umuahia or abroad, you can browse, evaluate, and secure a property with the same confidence and transparency.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
                alt="Team at work"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500">
                To make government property ownership transparent, accessible, and secure for every citizen and diaspora buyer, regardless of location.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500">
                A future where every government land allocation happens through a single trusted digital platform, free of middlemen and paperwork delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">What Guides Us</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">The principles behind every listing, every transaction, and every allocation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-500 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-white">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <span className="text-3xl font-bold text-emerald-400">{stat.value}</span>
                <span className="text-sm text-slate-300 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Ready to Find Your Property?</h2>
              <p className="text-emerald-100 mt-2">Browse verified government listings across the state today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/properties">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 border-none">
                  Browse Properties
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}