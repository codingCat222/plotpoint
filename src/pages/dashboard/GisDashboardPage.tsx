import React from 'react';
import { GisMapComponent } from '@/src/components/GisMapComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Layers, Search, MapPin } from 'lucide-react';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { useStore } from '@/src/store/useStore';
import { Link } from 'react-router-dom';

export function GisDashboardPage() {
  const { currentUser } = useStore();
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Properties & GIS</h1>
          <p className="text-slate-500">Manage and view spatial property allocations.</p>
        </div>
        <div className="flex gap-2">
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden h-[600px]">
        {/* Sidebar */}
        <Card className="w-80 flex flex-col shrink-0 hidden lg:flex h-full">
          <CardHeader className="pb-3 border-b border-slate-100 shrink-0">
            <CardTitle className="text-base flex items-center">
              <Layers className="h-4 w-4 mr-2 text-emerald-600" /> Map Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-6 overflow-y-auto">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900">Search Plot</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                <Input aria-label="Search Plot" placeholder="Plot number or estate..." className="pl-9" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900">Legend & Filters</h3>
              <div className="space-y-2 text-sm" role="list" aria-label="Legend">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100" role="listitem">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" aria-hidden="true" />
                    <span className="text-slate-700">Available</span>
                  </div>
                  <span className="font-medium">2,345</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100" role="listitem">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" aria-hidden="true" />
                    <span className="text-slate-700">Reserved</span>
                  </div>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100" role="listitem">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-400 mr-2" aria-hidden="true" />
                    <span className="text-slate-700">Sold / Allocated</span>
                  </div>
                  <span className="font-medium">8,912</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900">Active Estates</h3>
              <div className="space-y-2">
                <button aria-label="Select Sunrise Valley Estate" className="w-full text-left p-2 rounded hover:bg-slate-50 text-sm flex items-center group focus-visible:ring-2 focus-visible:ring-emerald-500">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400 group-hover:text-emerald-500" aria-hidden="true" />
                  <span className="truncate">Sunrise Valley Estate, Umuahia</span>
                </button>
                <button aria-label="Select Greenfields Housing" className="w-full text-left p-2 rounded hover:bg-slate-50 text-sm flex items-center group focus-visible:ring-2 focus-visible:ring-emerald-500">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400 group-hover:text-emerald-500" aria-hidden="true" />
                  <span className="truncate">Aba South Housing Scheme, Aba</span>
                </button>
                <button aria-label="Select Riverside Enclave" className="w-full text-left p-2 rounded hover:bg-slate-50 text-sm flex items-center group focus-visible:ring-2 focus-visible:ring-emerald-500">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400 group-hover:text-emerald-500" aria-hidden="true" />
                  <span className="truncate">Ogbor Hill Residential Enclave, Aba</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Container */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
          <GisMapComponent />
        </div>
      </div>
    </div>
  );
}
