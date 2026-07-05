import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, UserPlus, CheckCircle2, Building2 } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { Badge } from '@/src/components/ui/Badge';

export function PropertyAssignmentsPage() {
  const { properties, users } = useStore();
  const salesReps = users.filter(u => u.role === 'operations');
  
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [assignedReps, setAssignedReps] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleRep = (repId: string) => {
    if (assignedReps.includes(repId)) {
      setAssignedReps(prev => prev.filter(id => id !== repId));
    } else {
      setAssignedReps(prev => [...prev, repId]);
    }
  };

  const handleSave = () => {
    // Mock save
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Property Assignments</h1>
        <p className="text-slate-500">Assign sales personnel to properties for automatic lead routing.</p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-emerald-900">Assignments Saved!</h4>
            <p className="text-sm text-emerald-700 mt-1">
              Sales personnel will now automatically receive leads for the selected property.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              Select Property
            </CardTitle>
            <CardDescription>Choose a property to assign personnel to.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search properties..." className="pl-9" />
            </div>
            <div className="space-y-2 h-[400px] overflow-y-auto pr-2">
              {properties.map(property => (
                <div 
                  key={property.id}
                  onClick={() => setSelectedProperty(property.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedProperty === property.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-900">{property.title}</h4>
                      <p className="text-sm text-slate-500">{property.estate}</p>
                    </div>
                    <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={!selectedProperty ? 'opacity-50 pointer-events-none' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              Assign Sales Personnel
            </CardTitle>
            <CardDescription>Select one or more sales reps for this property.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search sales personnel..." className="pl-9" />
            </div>
            <div className="space-y-2 h-[330px] overflow-y-auto pr-2">
              {salesReps.map(rep => (
                <div 
                  key={rep.id}
                  onClick={() => handleToggleRep(rep.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                    assignedReps.includes(rep.id)
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                      {rep.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{rep.name}</h4>
                      <p className="text-sm text-slate-500">{rep.email}</p>
                    </div>
                  </div>
                  {assignedReps.includes(rep.id) && (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSave}
              disabled={assignedReps.length === 0}
            >
              Save Assignments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
