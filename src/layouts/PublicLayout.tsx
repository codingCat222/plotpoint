import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Building2, Search, User, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Logo } from '@/src/components/Logo';

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <style>{`
        @keyframes topbar-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .topbar-marquee-track {
          animation: topbar-marquee 14s linear infinite;
        }
      `}</style>

      <div className="bg-[#B51025] text-white text-xs sm:text-sm py-2 px-4 md:px-8 flex flex-row justify-between items-center gap-3 z-50 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="topbar-marquee-track flex items-center gap-8 whitespace-nowrap w-max">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href="mailto:info.lands@abiastate.gov.ng" className="hover:text-white">info.lands@abiastate.gov.ng</a>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>08099999999</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Block 77, Secretariat Road, Umuahia</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href="mailto:info.lands@abiastate.gov.ng" className="hover:text-white">info.lands@abiastate.gov.ng</a>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>08099999999</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Block 77, Secretariat Road, Umuahia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0 shrink-0">
          <a href="#" className="bg-blue-600 p-1.5 rounded-full hover:bg-blue-700 transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
          <a href="#" className="bg-sky-500 p-1.5 rounded-full hover:bg-sky-600 transition-colors"><Twitter className="h-3.5 w-3.5" /></a>
          <a href="#" className="bg-blue-700 p-1.5 rounded-full hover:bg-blue-800 transition-colors"><Linkedin className="h-3.5 w-3.5" /></a>
          <a href="#" className="bg-gradient-to-tr from-orange-500 to-pink-500 p-1.5 rounded-full hover:opacity-90 transition-opacity"><Instagram className="h-3.5 w-3.5" /></a>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 h-10 sm:h-12 flex items-center overflow-hidden [&_img]:h-full [&_img]:w-auto [&_svg]:h-full [&_svg]:w-auto">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-700">
            <Link to="/" className="text-[#008641] hover:text-[#008641] transition-colors">Home</Link>
            <Link to="/properties" className="hover:text-[#008641] transition-colors">Properties</Link>
            <Link to="/map" className="hover:text-[#008641] transition-colors">GIS Map</Link>
            <Link to="/about" className="hover:text-[#008641] transition-colors">About</Link>
            <Link to="/faq" className="hover:text-[#008641] transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden lg:block">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Log in</Button>
            </Link>
            <Link to="/register" className="hidden lg:block">
              <Button className="bg-[#008641] hover:bg-[#006f36] text-white font-medium shadow-md border-none px-6">Contact Us</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-700"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 md:px-8 py-4 flex flex-col gap-1">
            <Link to="/" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-[#008641] font-medium hover:bg-slate-50">Home</Link>
            <Link to="/properties" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-slate-700 font-medium hover:bg-slate-50">Properties</Link>
            <Link to="/map" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-slate-700 font-medium hover:bg-slate-50">GIS Map</Link>
            <Link to="/about" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-slate-700 font-medium hover:bg-slate-50">About</Link>
            <Link to="/faq" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-slate-700 font-medium hover:bg-slate-50">FAQ</Link>

            <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link to="/login" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-900">
                  <User className="h-4 w-4 mr-2" />
                  Log in
                </Button>
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <Button className="w-full bg-[#008641] hover:bg-[#006f36] text-white font-medium shadow-md border-none">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo lightText={true} />
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Your gateway to sustainable land management, efficient housing development, and urban planning. Together, we're shaping a prosperous future for every resident.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/properties" className="hover:text-[#008641] transition-colors">Buy Property</Link></li>
                <li><Link to="/estates" className="hover:text-[#008641] transition-colors">Our Projects</Link></li>
                <li><Link to="/map" className="hover:text-[#008641] transition-colors">GIS Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Block 77, Secretariat Road, Umuahia, Abia State</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>08099999999</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href="mailto:info.lands@abiastate.gov.ng" className="hover:text-white transition-colors">info.lands@abiastate.gov.ng</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Abia State Ministry of Lands and Housing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}