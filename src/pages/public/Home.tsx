import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, ChevronRight, ChevronDown, Mail, ShieldCheck, Star, Map as MapIcon } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { useStore } from '@/src/store/useStore';

const faqs = [
  {
    question: 'How do I know a property is genuine and government-verified?',
    answer: 'Every listing on this portal is uploaded and verified directly by the Ministry of Lands and Housing. Each property page shows its allocation status, title documentation, and verification badge.',
  },
  {
    question: 'What payment plans are available?',
    answer: 'You can pay in full or choose a flexible installment plan. Payments are processed securely via Paystack or Stripe depending on your location.',
  },
  {
    question: 'What documents do I need to complete KYC?',
    answer: 'You will need a valid government-issued ID, proof of address, and a passport photograph. Diaspora buyers can complete KYC remotely through the portal.',
  },
  {
    question: 'How long does it take to receive my allocation letter?',
    answer: 'Once payment is confirmed, your official allocation letter and ownership documents are generated and available for download instantly on your dashboard.',
  },
];

const testimonials = [
  {
    name: 'Chinedu Okafor',
    role: 'Diaspora Buyer, London',
    quote: 'I secured my plot in Umuahia from abroad without a single physical visit. The GIS map made it easy to see exactly what I was buying.',
  },
  {
    name: 'Blessing Nwosu',
    role: 'First-time Buyer',
    quote: 'The process was transparent from start to finish. I could track my payment plan and download my allocation letter the same day.',
  },
  {
    name: 'Emeka Iheanacho',
    role: 'Property Investor',
    quote: 'Verified listings gave me confidence. No middlemen, no uncertainty about title status.',
  },
];

export function Home() {
  const { properties } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProperties = properties.slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div>
      <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Cityscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/50" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Own a Piece of the Future. <br className="hidden md:block"/> Secure Government Property Today.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            The trusted marketplace for citizens and diaspora to discover, evaluate, and purchase government-owned land and housing seamlessly.
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 shadow-xl">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by state, estate, or keyword..." 
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select className="h-11 px-4 rounded-lg bg-slate-50 border-none outline-none text-slate-700 hidden sm:block">
                <option>All Types</option>
                <option>Land</option>
                <option>Housing</option>
              </select>
              <Button size="lg" className="h-11 bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Find Property
              </Button>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-white">
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-bold text-emerald-400">5k+</span>
              <span className="text-sm text-slate-300 mt-1">Properties Available</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-bold text-emerald-400">12</span>
              <span className="text-sm text-slate-300 mt-1">States Covered</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-bold text-emerald-400">24</span>
              <span className="text-sm text-slate-300 mt-1">Featured Estates</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-bold text-emerald-400">100%</span>
              <span className="text-sm text-slate-300 mt-1">Secure & Verified</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-6">Trusted & Secured By</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-semibold text-slate-500">Ministry of Lands & Housing</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span className="font-semibold text-slate-500">Abia State Government</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Paystack Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Stripe Secured</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Properties</h2>
              <p className="text-slate-500 mt-2">Explore the most sought-after government allocations available right now.</p>
            </div>
            <Link to="/properties" className="self-start sm:self-auto">
              <Button variant="outline" className="w-full sm:w-auto flex">
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200">
                  <div className="relative h-48 w-full bg-slate-200">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="default" className="bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm backdrop-blur-sm">
                        {property.type.toUpperCase()}
                      </Badge>
                      {property.status === 'available' && (
                        <Badge variant="success" className="shadow-sm">AVAILABLE</Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{property.estate}, {property.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Price</p>
                        <p className="font-bold text-lg text-emerald-700">
                          ₦{property.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-0.5">Size</p>
                        <p className="font-medium text-sm">{property.plotSize}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex gap-2 w-full mt-4">
                      <Link to={`/properties/${property.id}`} className="w-full">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <Building2 className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No properties listed yet</h3>
              <p className="text-slate-500 max-w-sm">New government allocations are added regularly. Check back soon or sign up below to get notified.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="default" className="bg-emerald-100 text-emerald-700 border-none mb-4">GIS Powered</Badge>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Explore Every Plot on the Interactive Map</h2>
              <p className="text-slate-500 mb-6 max-w-lg">
                View real boundaries, terrain, and nearby infrastructure before you commit. Our GIS map gives you a bird's eye view of every available government property.
              </p>
              <Link to="/map">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Explore Full GIS Map
                </Button>
              </Link>
            </div>
            <Link to="/map" className="block relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
                alt="GIS Map Preview"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors" />
              <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg px-4 py-2 flex items-center gap-2 shadow-md">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-800">Umuahia, Abia State</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How It Works</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">A transparent, step-by-step process designed to make acquiring government property simple and secure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Browse & Evaluate</h3>
              <p className="text-slate-500 text-sm">Explore verified properties using our interactive GIS map and virtual tours.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Inspect</h3>
              <p className="text-slate-500 text-sm">Book a physical inspection or request a live virtual tour with our sales team.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <ChevronRight className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Reserve & Pay</h3>
              <p className="text-slate-500 text-sm">Complete your KYC, reserve your plot, and choose a flexible payment plan.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">4. Receive Allocation</h3>
              <p className="text-slate-500 text-sm">Upon payment completion, receive your official allocation letter and ownership documents instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">What Buyers Are Saying</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Real experiences from citizens and diaspora who secured their property through the portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-4">Everything you need to know before you buy.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-slate-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-500 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq">
              <Button variant="outline">
                View All FAQs <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Ready to Secure Your Plot?</h2>
              <p className="text-emerald-100 mt-2">Start your application today and join thousands of verified property owners.</p>
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

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Get Notified of New Plots</h2>
          <p className="text-slate-400 mb-8">Be the first to know when new government properties become available in your preferred state.</p>

          {subscribed ? (
            <p className="text-emerald-400 font-medium">You're subscribed. We'll keep you posted.</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <Button type="submit" size="lg" className="h-12 bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}