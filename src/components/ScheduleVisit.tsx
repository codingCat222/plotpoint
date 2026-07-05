import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Property, useStore } from '@/src/store/useStore';
import { useNavigate } from 'react-router-dom';

interface ScheduleVisitProps {
  property: Property;
  onClose: () => void;
}

export function ScheduleVisit({ property, onClose }: ScheduleVisitProps) {
  const { currentUser } = useStore();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate next 14 days for date selection
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start from tomorrow
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    // Simulate API call for booking
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="success-title">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl border border-slate-200">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CalendarIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          </div>
          <h2 id="success-title" className="text-xl font-bold text-slate-900 mb-2">Visit Scheduled!</h2>
          <p className="text-slate-600 mb-6">
            Your site visit for {property.title} has been booked for {new Date(selectedDate).toLocaleDateString()} at {selectedTime}. A sales representative will contact you shortly.
          </p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="schedule-title">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0">
          <h2 id="schedule-title" className="text-lg font-bold text-slate-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-emerald-600" aria-hidden="true" />
            Schedule Site Visit
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-500">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-900 mb-1">{property.title}</p>
            <p className="text-xs text-slate-500">{property.estate}, {property.location}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label id="date-label" className="block text-sm font-medium text-slate-700 mb-3">
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="date-label">
                {dates.slice(0, 6).map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    aria-pressed={selectedDate === date.value}
                    className={`px-3 py-2 text-sm rounded-lg border text-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      selectedDate === date.value
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-center">
                <select 
                  aria-label="Select more dates"
                  className="text-sm text-emerald-600 bg-transparent border-none focus:ring-0 cursor-pointer font-medium focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="" disabled>More dates...</option>
                  {dates.slice(6).map((date) => (
                    <option key={date.value} value={date.value}>{date.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDate && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label id="time-label" className="block text-sm font-medium text-slate-700 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-slate-400" aria-hidden="true" /> Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="time-label">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={selectedTime === time}
                      className={`px-2 py-2 text-xs rounded-lg border text-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        selectedTime === time
                          ? 'border-emerald-600 bg-emerald-600 text-white font-medium shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100">
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!selectedDate || !selectedTime || isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
