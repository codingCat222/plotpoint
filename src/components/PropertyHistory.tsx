import React from 'react';
import { CheckCircle2, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Property } from '@/src/store/useStore';

interface PropertyHistoryProps {
  property: Property;
}

export function PropertyHistory({ property }: PropertyHistoryProps) {
  // Generate some realistic-looking history dates based on property status
  const today = new Date();
  
  const events = [
    {
      title: 'Property Listed',
      description: 'Property officially listed for allocation.',
      date: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 90 days ago
      completed: true,
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: 'Documentation Uploaded',
      description: 'Official survey and C of O documents verified and uploaded.',
      date: new Date(today.getTime() - 85 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 85 days ago
      completed: true,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      title: 'Reserved',
      description: property.status === 'reserved' || property.status === 'sold' 
        ? 'Property reserved by a verified buyer.' 
        : 'Awaiting reservation.',
      date: property.status === 'reserved' || property.status === 'sold' 
        ? new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString() // 2 days ago
        : null,
      completed: property.status === 'reserved' || property.status === 'sold',
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: 'Sold & Allocated',
      description: property.status === 'sold' 
        ? 'Payment completed and property allocated.' 
        : 'Awaiting full payment and allocation.',
      date: property.status === 'sold' 
        ? today.toLocaleDateString() 
        : null,
      completed: property.status === 'sold',
      icon: <CheckCircle2 className="h-4 w-4" />
    }
  ];

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-slate-900 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-emerald-600" />
          Property History
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {events.map((event, index) => (
            <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                event.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
              }`}>
                {event.icon}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h4 className={`font-semibold text-sm ${event.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                    {event.title}
                  </h4>
                  {event.date && (
                    <span className="text-xs font-medium text-slate-500 sm:ml-2">
                      {event.date}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
