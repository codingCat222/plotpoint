import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/src/store/useStore';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Shield, User, Users, Briefcase, FileText, Settings } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, users, setCurrentUser } = useStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Map requested roles to internal roles
  const roles = [
    { label: 'Public Visitor', internalRole: null, icon: User },
    { label: 'Buyer', internalRole: 'buyer', icon: User },
    { label: 'Sales Personnel', internalRole: 'sales_rep', icon: Users },
    { label: 'Sales Head', internalRole: 'supervisor', icon: Briefcase },
    { label: 'Government Representative', internalRole: 'executive', icon: FileText },
    { label: 'Operations Administrator', internalRole: 'operations', icon: Settings },
    { label: 'Super Administrator', internalRole: 'admin', icon: Shield },
  ];

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (internalRole: string | null) => {
    if (internalRole === null) {
      setCurrentUser(null);
      navigate('/');
    } else {
      const user = users.find(u => u.role === internalRole);
      if (user) {
        setCurrentUser(user);
        navigate('/dashboard');
      }
    }
    setIsOpen(false);
  };

  const currentRoleObj = roles.find(r => r.internalRole === (currentUser?.role || null));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-slate-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center gap-1.5 whitespace-nowrap text-xs">
          <span className="font-semibold text-emerald-700">Demo Mode:</span> 
          {currentRoleObj?.label || 'Public Visitor'}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
              Switch Role
            </div>
            {roles.map((role) => (
              <button
                key={role.label}
                onClick={() => handleRoleSwitch(role.internalRole)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                  (currentUser?.role || null) === role.internalRole
                    ? 'bg-emerald-50 text-emerald-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                role="menuitem"
              >
                <role.icon className={`h-4 w-4 ${
                  (currentUser?.role || null) === role.internalRole
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }`} />
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
