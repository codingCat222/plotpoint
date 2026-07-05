import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Clock, Shield, MapPin, FileCheck, Info, ChevronRight, HelpCircle } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';

interface TimelineStep {
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  status: 'completed' | 'active' | 'upcoming';
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

interface AcquisitionTimelineProps {
  status: string;
  propertyName: string;
}

export function AcquisitionTimeline({ status, propertyName }: AcquisitionTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Derive steps statuses dynamically
  const getSteps = (): TimelineStep[] => {
    const baseSteps = [
      {
        title: "Reservation Submitted",
        subtitle: "Initial plot hold on ABIAGIS Portal",
        description: "The buyer submits a formal request to reserve the parcel of land or housing unit, initiating the secure holding period.",
        estimatedTime: "Instant",
        icon: Clock,
        details: [
          "Reservation fee cleared successfully",
          "Plot coordinate lock active in GIS system",
          "Draft allocation file registered"
        ]
      },
      {
        title: "Ministry Document Audit",
        subtitle: "Verify ABSSIN and Government ID",
        description: "The Ministry of Lands, Housing & Urban Development audits the buyer's Abia State Social Security Number (ABSSIN) and identity documents.",
        estimatedTime: "1-2 Business Days",
        icon: Shield,
        details: [
          "ABSSIN database identity matching",
          "Tax compliance clearance certificate verification",
          "Ministry of Lands sign-off on assignee eligibility"
        ]
      },
      {
        title: "Initial Deposit & Payment",
        subtitle: "Payment clearance & treasury confirmation",
        description: "The buyer completes the initial installment or deposit via the online Flutterwave gateway or bank transfer, confirmed by the state treasury.",
        estimatedTime: "Awaiting payment",
        icon: FileCheck,
        details: [
          "Bank receipt or online transfer reference check",
          "Treasury Single Account (TSA) credit confirmation",
          "Allocation down-payment ledger update"
        ]
      },
      {
        title: "GIS Coordinates Mapping",
        subtitle: "Spatial boundary survey & registry sign-off",
        description: "ABIAGIS surveyors finalize the physical coordinates, mapping boundaries into the Abia State GIS database to prevent double allocations.",
        estimatedTime: "3-5 Business Days",
        icon: MapPin,
        details: [
          "Beacon coordinate generation",
          "Boundary charting in land registry database",
          "Digital spatial allocation clearance certificate"
        ]
      },
      {
        title: "Deed & Certificate of Occupancy",
        subtitle: "Legal title transfer & governor sign-off",
        description: "Drafting of the Deed of Sublease / Assignment and final presentation of the electronic Certificate of Occupancy (C of O) signed by the Governor.",
        estimatedTime: "5-10 Business Days",
        icon: FileCheck,
        details: [
          "Legal drafting of the Assignment instrument",
          "Registry documentation stamps & seal of authority",
          "C of O handover to the assignee"
        ]
      }
    ];

    if (status === 'pending') {
      return baseSteps.map((step, idx) => ({
        ...step,
        status: idx === 0 ? 'completed' : idx === 1 ? 'active' : 'upcoming',
        estimatedTime: idx === 1 ? "In Progress" : step.estimatedTime
      }));
    } else if (status === 'approved') {
      return baseSteps.map((step, idx) => ({
        ...step,
        status: idx < 2 ? 'completed' : idx === 2 ? 'active' : 'upcoming',
        estimatedTime: idx === 2 ? "Awaiting Deposit" : step.estimatedTime
      }));
    } else {
      // Completed / verified
      return baseSteps.map((step, idx) => ({
        ...step,
        status: idx < 4 ? 'completed' : idx === 4 ? 'active' : 'upcoming',
        estimatedTime: idx === 4 ? "Awaiting Sign-off" : step.estimatedTime
      }));
    }
  };

  const steps = getSteps();
  const currentActiveIdx = steps.findIndex(s => s.status === 'active');

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200/60 p-4 md:p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Acquisition Progress & Legal Timeline
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status of your land registry allocation for {propertyName}.</p>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider bg-white border-slate-200 text-slate-600">
          Step {currentActiveIdx !== -1 ? currentActiveIdx + 1 : 1} of 5
        </Badge>
      </div>

      {/* Timeline Steps Layout */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-2 mb-6">
        {/* Connection Line Behind Steps (Desktop Only) */}
        <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />

        {steps.map((step, idx) => {
          const IconComp = step.icon;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div 
              key={idx} 
              className="relative flex md:flex-col items-center gap-4 md:gap-2 z-10 flex-1 w-full cursor-pointer group"
              onClick={() => setSelectedStep(selectedStep === idx ? null : idx)}
            >
              {/* Node Circle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' 
                    : isActive 
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse' 
                    : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <IconComp className="h-4 w-4" />
                )}
              </motion.div>

              {/* Node text details */}
              <div className="text-left md:text-center">
                <p className={`text-xs font-bold transition-colors ${isActive ? 'text-amber-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 hidden sm:block md:max-w-[130px] md:mx-auto truncate">
                  {step.subtitle}
                </p>
                <Badge 
                  variant={isCompleted ? 'success' : isActive ? 'warning' : 'secondary'} 
                  className="text-[8px] py-0 px-1 mt-1 font-mono tracking-tighter"
                >
                  {step.status.toUpperCase()}
                </Badge>
              </div>

              {/* Right chevron for mobile layout */}
              <ChevronRight className="h-4 w-4 text-slate-300 ml-auto md:hidden" />
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Panel */}
      <motion.div 
        layout
        className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm"
      >
        {selectedStep !== null ? (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-lg ${
                  steps[selectedStep].status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                  steps[selectedStep].status === 'active' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {React.createElement(steps[selectedStep].icon, { className: 'h-4 w-4' })}
                </span>
                <h5 className="font-bold text-sm text-slate-900">{steps[selectedStep].title}</h5>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                Est: {steps[selectedStep].estimatedTime}
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {steps[selectedStep].description}
            </p>

            <div>
              <span className="block font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-1.5">Registry Audit Checklist:</span>
              <ul className="space-y-1.5">
                {steps[selectedStep].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-600">
                    <span className="text-emerald-500 mr-2 mt-0.5 font-bold">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-xs text-slate-500 justify-center py-2 italic">
            <Info className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Click on any milestone above to view detailed requirements, legal checklist, and registry status.</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
