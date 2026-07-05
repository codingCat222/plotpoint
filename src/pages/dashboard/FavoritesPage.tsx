import React from 'react';
import { Card, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { MapPin, Heart, HeartOff, Trash2 } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { Link } from 'react-router-dom';

export function FavoritesPage() {
  const { currentUser, properties, favorites, removeFavorite } = useStore();

  const userFavorites = favorites.filter(f => f.buyerId === currentUser?.id);
  const favoriteProperties = properties.filter(p => userFavorites.some(f => f.propertyId === p.id));

  const handleRemove = (propertyId: string) => {
    if (currentUser) {
      removeFavorite(propertyId, currentUser.id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Favorites</h1>
        <p className="text-slate-500">Properties you have saved to your wishlist.</p>
      </div>

      {favoriteProperties.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <HeartOff className="h-12 w-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Favorites Yet</h3>
            <p className="text-slate-500 mb-6">You haven't added any properties to your wishlist.</p>
            <Link to="/dashboard/marketplace">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteProperties.map(property => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group flex flex-col">
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden shrink-0">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge variant={
                    property.status === 'available' ? 'success' : 
                    property.status === 'reserved' ? 'warning' : 'destructive'
                  } className="w-fit">
                    {property.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge className="bg-white/90 text-slate-900 hover:bg-white w-fit shadow-sm">
                    {property.type.toUpperCase()}
                  </Badge>
                </div>
                <button 
                  onClick={() => handleRemove(property.id)}
                  aria-label={`Remove ${property.title} from favorites`}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:bg-white hover:text-red-600 hover:scale-110 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-red-500"
                  title="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1">{property.title}</h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" aria-hidden="true" />
                  <span className="line-clamp-1">{property.estate}, {property.location}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Price</p>
                    <p className="font-bold text-slate-900">₦{property.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Size</p>
                    <p className="font-medium text-slate-900">{property.plotSize}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 shrink-0">
                <Link to={`/dashboard/marketplace/${property.id}`} className="w-full" aria-label={`View details for ${property.title}`}>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}