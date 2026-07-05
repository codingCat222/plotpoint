import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, Search, Bell, Settings, LogOut, 
  Map, FileText, Users, CreditCard, Calendar, BarChart3, ChevronDown, Heart, Briefcase, Menu, X, User, Plus
} from 'lucide-react';
import { useStore, UserRole } from '@/src/store/useStore';
import { Button } from '@/src/components/ui/Button';
import { RoleSwitcher } from '@/src/components/RoleSwitcher';
import { Logo } from '@/src/components/Logo';

export function DashboardLayout() {
  const { currentUser, setCurrentUser } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>; // Should redirect to login ideally
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const getNavigation = (role: UserRole) => {
    switch (role) {
      case 'buyer':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Marketplace', href: '/dashboard/marketplace', icon: Search },
          { name: 'My Reservations', href: '/dashboard/reservations', icon: Calendar },
          { name: 'My Favorites', href: '/dashboard/favorites', icon: Heart },
          { name: 'My Payments', href: '/dashboard/payments', icon: CreditCard },
          { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        ];
      case 'executive':
        return [
          { name: 'Executive Overview', href: '/dashboard', icon: BarChart3 },
          { name: 'Properties & GIS', href: '/dashboard/properties', icon: Map },
          { name: 'Finance & Revenue', href: '/dashboard/finance', icon: CreditCard },
          { name: 'Reports', href: '/dashboard/reports', icon: FileText },
        ];
      case 'admin':
        return [
          { name: 'Executive Overview', href: '/dashboard', icon: BarChart3 },
          { name: 'Properties & GIS', href: '/dashboard/properties', icon: Map },
          { name: 'Add Property', href: '/dashboard/properties/add', icon: Plus },
          { name: 'Finance & Revenue', href: '/dashboard/finance', icon: CreditCard },
          { name: 'Buyers', href: '/dashboard/buyers', icon: Users },
          { name: 'Users', href: '/dashboard/users', icon: Users },
        ];
      case 'operations':
        return [
          { name: 'Operations Desk', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Inventory & GIS', href: '/dashboard/properties', icon: Map },
          { name: 'Add Property', href: '/dashboard/properties/add', icon: Plus },
          { name: 'Buyers', href: '/dashboard/buyers', icon: Users },
          { name: 'Inspections', href: '/dashboard/inspections', icon: Calendar },
          { name: 'Wallet & Payouts', href: '/dashboard/wallet', icon: CreditCard },
          { name: 'Finance & Payments', href: '/dashboard/finance', icon: CreditCard },
          { name: 'Reports', href: '/dashboard/reports', icon: FileText },
          { name: 'Users', href: '/dashboard/users', icon: Users },
        ];
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ];
    }
  };

  const navigation = getNavigation(currentUser.role);

  return (
    <div className="flex h-screen bg-slate-50">
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between px-4 bg-slate-950">
          <Link to="/" className="hover:opacity-95 transition-opacity">
            <Logo lightText={true} />
          </Link>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Sidebar Navigation">
            <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {currentUser.role.replace('_', ' ')} Portal
            </div>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-emerald-200' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-slate-800 p-4 space-y-1">
          <Link to="/dashboard/settings" aria-label="User Profile Settings" className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded-md transition-colors -mx-2 focus-visible:ring-2 focus-visible:ring-emerald-500">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium" aria-hidden="true">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{currentUser.name}</span>
              <span className="text-xs text-slate-500 truncate w-32">{currentUser.email}</span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 hover:bg-slate-800 p-2 rounded-md transition-colors -mx-2 text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <LogOut className="h-4 w-4 ml-1" aria-hidden="true" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-4">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700"
              aria-label="Open navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex w-full max-w-md items-center relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search dashboard"
                placeholder="Search anything..."
                className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Notifications" className="relative p-2 text-slate-400 hover:text-slate-500 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md">
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden="true" />
            </button>
            <div className="h-6 w-px bg-slate-200" aria-hidden="true" />
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-medium" aria-hidden="true">
                  {currentUser.name.charAt(0)}
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-medium shrink-0" aria-hidden="true">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {currentUser.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      Settings
                    </Link>
                  </div>
                  <div className="p-1.5 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}