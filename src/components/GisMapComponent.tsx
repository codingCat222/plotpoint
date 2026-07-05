import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { useStore, Property } from '@/src/store/useStore';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

// Create custom icons for different statuses
const createIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  available: createIcon('green'),
  reserved: createIcon('orange'),
  sold: createIcon('grey'),
  pending_allocation: createIcon('blue')
};

// Zoning & Land-Use Districts for Umuahia and Aba
const zoningDistricts = [
  // Umuahia
  {
    name: "Umuahia Central Residential Zone",
    city: "Umuahia",
    color: "#3b82f6", // Blue
    fillColor: "#93c5fd",
    coordinates: [
      [5.535, 7.480],
      [5.535, 7.500],
      [5.520, 7.500],
      [5.520, 7.480]
    ] as [number, number][],
    description: "Low to medium density residential housing. Subject to Abia State Master Plan regulations.",
    permitted: "Single-family houses, duplexes, community clinics, public parks."
  },
  {
    name: "Umuahia Govt & Commercial Hub",
    city: "Umuahia",
    color: "#ef4444", // Red
    fillColor: "#fca5a5",
    coordinates: [
      [5.548, 7.485],
      [5.548, 7.495],
      [5.535, 7.495],
      [5.535, 7.485]
    ] as [number, number][],
    description: "Abia State Government Administrative area and central commercial activities.",
    permitted: "Government secretariats, offices, retail centers, banks, hotels."
  },
  {
    name: "Umuahia Mixed-Use Light Industrial",
    city: "Umuahia",
    color: "#8b5cf6", // Purple
    fillColor: "#c084fc",
    coordinates: [
      [5.520, 7.485],
      [5.520, 7.498],
      [5.508, 7.498],
      [5.508, 7.485]
    ] as [number, number][],
    description: "Zoned for light enterprise, logistics, and residential mixed development.",
    permitted: "Warehousing, showrooms, corporate offices, mixed-use apartments."
  },
  
  // Aba
  {
    name: "Aba South Commercial & Market Zone",
    city: "Aba",
    color: "#ef4444", // Red
    fillColor: "#fca5a5",
    coordinates: [
      [5.115, 7.360],
      [5.115, 7.380],
      [5.100, 7.380],
      [5.100, 7.360]
    ] as [number, number][],
    description: "High density commercial hub centering around central markets, enterprise zones, and retail.",
    permitted: "Wholesale & retail shops, commercial plazas, hotels, financial institutions."
  },
  {
    name: "Ogbor Hill Residential & Civic Zone",
    city: "Aba",
    color: "#10b981", // Green (residential / green belt)
    fillColor: "#a7f3d0",
    coordinates: [
      [5.130, 7.375],
      [5.130, 7.395],
      [5.115, 7.395],
      [5.115, 7.375]
    ] as [number, number][],
    description: "Serene residential district overlooking Abia river. High premium allocations.",
    permitted: "Luxury residential estates, schools, recreational clubs, general residential."
  },
  {
    name: "Aba North Light Industrial & Manufacturing Zone",
    city: "Aba",
    color: "#f59e0b", // Amber
    fillColor: "#fef08a",
    coordinates: [
      [5.145, 7.360],
      [5.145, 7.378],
      [5.130, 7.378],
      [5.130, 7.360]
    ] as [number, number][],
    description: "Manufacturing, fabrication, and large-scale industrial activities under the Abia Special Economic Zone.",
    permitted: "Factories, assembly plants, engineering workshops, heavy commercial depots."
  }
];

export function GisMapComponent() {
  const { properties } = useStore();
  
  // Centered on Abia State (spanning Umuahia and Aba)
  const defaultCenter: [number, number] = [5.32, 7.43];

  return (
    <div className="w-full h-full min-h-[500px] relative rounded-xl overflow-hidden border border-slate-200">
      <MapContainer center={defaultCenter} zoom={10} className="w-full h-full" scrollWheelZoom={true}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          {/* Zoning and Land-Use layer (enabled by default to highlight the feature!) */}
          <LayersControl.Overlay checked name="Zoning & Land-Use Data">
            <FeatureGroup>
              {zoningDistricts.map((district, idx) => (
                <Polygon
                  key={idx}
                  positions={district.coordinates}
                  pathOptions={{
                    color: district.color,
                    fillColor: district.fillColor,
                    fillOpacity: 0.45,
                    weight: 2,
                    dashArray: '3'
                  }}
                >
                  <Popup>
                    <div className="p-1 max-w-xs text-xs">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1 mb-1.5">
                        <span className="font-bold text-slate-900 text-sm">{district.name}</span>
                        <Badge variant="secondary" className="text-[10px] whitespace-nowrap bg-slate-100">{district.city}</Badge>
                      </div>
                      <p className="text-slate-600 mb-2 leading-relaxed">{district.description}</p>
                      <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="block font-semibold text-slate-800 uppercase text-[9px] tracking-wider mb-0.5">Permitted Land Use:</span>
                        <span className="text-slate-600 text-[10px] leading-snug">{district.permitted}</span>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>

          {/* Available Properties */}
          <LayersControl.Overlay checked name="Available Plots">
            <FeatureGroup>
              {properties.filter(p => p.status === 'available').map(property => (
                <PropertyMarker key={property.id} property={property} icon={icons.available} />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>

          {/* Reserved Properties */}
          <LayersControl.Overlay checked name="Reserved Plots">
            <FeatureGroup>
              {properties.filter(p => p.status === 'reserved').map(property => (
                <PropertyMarker key={property.id} property={property} icon={icons.reserved} />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>

          {/* Sold Properties */}
          <LayersControl.Overlay checked name="Sold Plots">
            <FeatureGroup>
              {properties.filter(p => p.status === 'sold' || p.status === 'pending_allocation').map(property => (
                <PropertyMarker key={property.id} property={property} icon={icons.sold} />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

function PropertyMarker({ property, icon }: { property: Property, icon: L.Icon }) {
  return (
    <Marker position={property.coordinates} icon={icon}>
      <Popup className="property-popup">
        <div className="w-48">
          <div className="h-24 w-full bg-slate-200 mb-2 rounded overflow-hidden">
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          <h4 className="font-semibold text-sm leading-tight mb-1">{property.title}</h4>
          <p className="text-xs text-slate-500 mb-2">{property.estate}</p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-emerald-600 text-sm">₦{(property.price / 1000000).toFixed(1)}m</span>
            <Badge variant={
              property.status === 'available' ? 'success' : 
              property.status === 'reserved' ? 'warning' : 'secondary'
            } className="text-[10px] px-1.5 py-0">
              {property.status.toUpperCase()}
            </Badge>
          </div>
          
          <Link to={`/properties/${property.id}`} className="block w-full">
            <Button size="sm" className="w-full h-7 text-xs">View Details</Button>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}
