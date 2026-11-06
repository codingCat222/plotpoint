import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Joyride, Step } from 'react-joyride';
import { Search, MapPin, SlidersHorizontal, Heart, Map as MapIcon, X } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { useStore, Property } from '@/src/store/useStore';

export function Properties() {
  const { properties, currentUser, favorites, addFavorite, removeFavorite } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const basePath = isDashboard ? '/dashboard/marketplace' : '/properties';

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem('property-tour-completed');
    if (!hasCompletedTour) {
      // Small delay to ensure elements are rendered
      const timer = setTimeout(() => setRunTour(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data: unknown) => {
    const { status } = data;
    const finishedStatuses: string[] = ['finished', 'skipped'];
    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('property-tour-completed', 'true');
    }
  };

  const steps: unknown[] = [
    {
      target: '#tour-search-bar',
      content: 'Quickly find properties by typing the title, location, or estate.',
      disableBeacon: true,
    },
    {
      target: '#tour-filters-button',
      content: 'Use advanced filters to narrow down by price, property type, and location.',
    },
    {
      target: '#tour-map-button',
      content: 'View all available properties on an interactive GIS map.',
    },
    {
      target: '#tour-property-card',
      content: 'Click here to view detailed information, take a virtual tour, or calculate mortgage payments.',
    }
  ];
  
  const [sortBy, setSortBy] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');

  const searchTerm = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';
  const locationFilter = searchParams.get('location') || 'all';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : '';
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '';

  const uniqueLocations = useMemo(() => {
    const locs = new Set(properties.map(p => p.location));
    return Array.from(locs);
  }, [properties]);

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const parseSize = (sizeStr: string): number => {
    return parseInt(sizeStr.replace(/[^0-9]/g, '')) || 0;
  };

  const filtered = useMemo(() => {
    let result = properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.estate.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      const matchesLocation = locationFilter === 'all' || p.location === locationFilter;
      const matchesMinPrice = minPrice === '' || p.price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || p.price <= Number(maxPrice);

      // District Filter (estates/districts within Umuahia & Aba)
      const matchesDistrict = districtFilter === 'all' || p.estate === districtFilter;

      // Size Filter
      const sizeValue = parseSize(p.plotSize);
      let matchesSize = true;
      if (sizeFilter === 'small') {
        matchesSize = sizeValue < 400;
      } else if (sizeFilter === 'medium') {
        matchesSize = sizeValue >= 400 && sizeValue <= 600;
      } else if (sizeFilter === 'large') {
        matchesSize = sizeValue > 600;
      }

      return matchesSearch && matchesType && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesDistrict && matchesSize;
    });

    // Sorting size / price
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'size-asc') {
      result = [...result].sort((a, b) => parseSize(a.plotSize) - parseSize(b.plotSize));
    } else if (sortBy === 'size-desc') {
      result = [...result].sort((a, b) => parseSize(b.plotSize) - parseSize(a.plotSize));
    }

    return result;
  }, [properties, searchTerm, typeFilter, locationFilter, minPrice, maxPrice, districtFilter, sizeFilter, sortBy]);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
      <Joyride
        {...({
          steps,
          run: runTour,
          continuous: true,
          showProgress: true,
          showSkipButton: true,
          callback: handleJoyrideCallback,
          styles: {
            options: {
              primaryColor: '#10b981',
              zIndex: 1000,
            }
          }
        } as unknown)}
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Properties</h1>
            <p className="text-slate-500 mt-1">Discover available government-owned properties</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64" id="tour-search-bar">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <Button 
              id="tour-filters-button"
              variant={showFilters ? "default" : "outline"} 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            {!isDashboard && (
              <Link to="/map" id="tour-map-button">
                <Button variant="outline" size="icon">
                  <MapIcon className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="mb-8 border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-900">Advanced Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setSortBy('all');
                    setSizeFilter('all');
                    setDistrictFilter('all');
                  }} 
                  className="text-slate-500 hover:text-slate-900"
                >
                  Clear All
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Property Type</label>
                  <select 
                    value={typeFilter}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Types</option>
                    <option value="land">Land</option>
                    <option value="house">House</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">City Location</label>
                  <select 
                    value={locationFilter}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Locations</option>
                    {uniqueLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Specific District / Scheme</label>
                  <select 
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Districts</option>
                    <optgroup label="Umuahia Districts">
                      <option value="Sunrise Valley Estate">Sunrise Valley Estate</option>
                    </optgroup>
                    <optgroup label="Aba Districts">
                      <option value="Aba South Housing Scheme">Aba South Housing Scheme (Aba South)</option>
                      <option value="Ogbor Hill Enclave">Ogbor Hill Enclave (Ogbor Hill)</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Plot / House Size</label>
                  <select 
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Sizes</option>
                    <option value="small">Small (Under 400 sqm)</option>
                    <option value="medium">Medium (400 - 600 sqm)</option>
                    <option value="large">Large (Over 600 sqm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Min Price (₦)</label>
                  <input 
                    type="number"
                    value={minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="No minimum"
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Max Price (₦)</label>
                  <input 
                    type="number"
                    value={maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="No maximum"
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Sort Properties By</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium text-emerald-700"
                  >
                    <option value="all">Sort Options: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="size-asc">Size: Smallest first</option>
                    <option value="size-desc">Size: Largest first</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((property, idx) => {
            const isFavorite = currentUser ? favorites.some(f => f.propertyId === property.id && f.buyerId === currentUser.id) : false;
            
            const handleFavoriteClick = (e: React.MouseEvent) => {
              e.preventDefault();
              if (!currentUser) return; // Optional: could redirect to login here
              
              if (isFavorite) {
                removeFavorite(property.id, currentUser.id);
              } else {
                addFavorite(property.id, currentUser.id);
              }
            };

            return (
            <Card key={property.id} id={idx === 0 ? "tour-property-card" : undefined} className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group flex flex-col">
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden shrink-0">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge variant="default" className="bg-slate-900/90 text-white border-none shadow-sm backdrop-blur-sm">
                    {property.type.toUpperCase()}
                  </Badge>
                  {property.status === 'available' ? (
                    <Badge variant="success" className="shadow-sm">AVAILABLE</Badge>
                  ) : property.status === 'reserved' ? (
                    <Badge variant="warning" className="shadow-sm bg-amber-500">RESERVED</Badge>
                  ) : (
                    <Badge variant="secondary" className="shadow-sm">SOLD</Badge>
                  )}
                </div>
                <button 
                  onClick={handleFavoriteClick}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm shadow-sm transition-colors ${
                    isFavorite ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white/80 text-slate-600 hover:text-red-500 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
              <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1">{property.title}</h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{property.estate}, {property.location}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Price</p>
                    <p className="font-bold text-lg text-emerald-700">
                      ₦{property.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">Size</p>
                    <p className="font-medium text-sm text-slate-700">{property.plotSize}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 shrink-0">
                <Link to={`${basePath}/${property.id}`} className="w-full">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
            );
          })}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-slate-900">No properties found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}