import React from 'react';
import { GisMapComponent } from '@/src/components/GisMapComponent';

export function GisMapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Interactive GIS Map</h1>
          <p className="text-sm text-slate-500">Explore properties, estates, and layouts visually.</p>
        </div>
      </div>
      <div className="flex-1 bg-slate-50 p-4">
        <div className="container mx-auto h-full">
          <GisMapComponent />
        </div>
      </div>
    </div>
  );
}
