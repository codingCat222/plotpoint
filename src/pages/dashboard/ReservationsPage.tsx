import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Calendar, MapPin, Clock, CreditCard } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { Link } from 'react-router-dom';
import { AcquisitionTimeline } from '@/src/components/AcquisitionTimeline';

export function ReservationsPage() {
  const { currentUser, reservations, properties } = useStore();

  const userReservations = reservations.filter(r => r.buyerId === currentUser?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Reservations</h1>
        <p className="text-slate-500">View and manage your property reservations and their status.</p>
      </div>

      {userReservations.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Reservations Found</h3>
            <p className="text-slate-500 mb-6">You haven't made any property reservations yet.</p>
            <Link to="/properties">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {userReservations.map(reservation => {
            const property = properties.find(p => p.id === reservation.propertyId);
            if (!property) return null;

            return (
              <Card key={reservation.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto relative shrink-0">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={
                        reservation.status === 'approved' ? 'success' : 
                        reservation.status === 'pending' ? 'warning' : 'destructive'
                      }>
                        {reservation.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{property.title}</h3>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                          {property.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-emerald-600">
                          ₦{property.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">Property Value</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Date
                        </div>
                        <div className="font-medium text-slate-900 text-sm">{new Date(reservation.reservedAt).toLocaleDateString()}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Reservation ID</div>
                        <div className="font-medium text-slate-900 text-sm">{reservation.id}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Type</div>
                        <div className="font-medium text-slate-900 text-sm capitalize">{property.type}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-xs text-slate-500 mb-1">Size</div>
                        <div className="font-medium text-slate-900 text-sm">{property.plotSize}</div>
                      </div>
                    </div>

                    {/* Acquisition Progress Timeline */}
                    <AcquisitionTimeline status={reservation.status} propertyName={property.title} />

                    <div className="mt-auto flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                      <Link to={`/properties/${property.id}`} aria-label={`View Property ${property.title}`}>
                        <Button variant="outline">View Property</Button>
                      </Link>
                      {reservation.status === 'approved' && (
                        <Link to="/dashboard/payments" aria-label={`Make Payment for ${property.title}`}>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <CreditCard className="h-4 w-4 mr-2" aria-hidden="true" /> Make Payment
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
