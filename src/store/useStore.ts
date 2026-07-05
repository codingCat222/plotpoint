import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'buyer' | 'operations' | 'executive' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  estate: string;
  location: string;
  price: number;
  status: 'available' | 'reserved' | 'sold' | 'pending_allocation';
  type: 'land' | 'house';
  plotSize: string;
  images: string[];
  videos?: string[];
  coordinates: [number, number];
}

export interface Reservation {
  id: string;
  propertyId: string;
  buyerId: string;
  reservedAt: string;
  expiresAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Favorite {
  propertyId: string;
  buyerId: string;
}

export interface Review {
  id: string;
  propertyId: string;
  buyerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface State {
  currentUser: User | null;
  users: User[];
  properties: Property[];
  reservations: Reservation[];
  favorites: Favorite[];
  reviews: Review[];
  setCurrentUser: (user: User | null) => void;
  reserveProperty: (propertyId: string, buyerId: string) => void;
  addFavorite: (propertyId: string, buyerId: string) => void;
  removeFavorite: (propertyId: string, buyerId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  addProperty: (property: Omit<Property, 'id'>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
}

const mockUsers: User[] = [
  { id: 'u1', name: 'John Citizen', email: 'john@example.com', password: 'password123', role: 'buyer' },
  { id: 'u4', name: 'Anna Ops', email: 'anna@plotpoint.gov', password: 'password123', role: 'operations' },
  { id: 'u5', name: 'Gov Rep', email: 'rep@plotpoint.gov', password: 'password123', role: 'executive' },
  { id: 'u6', name: 'Super Admin', email: 'admin@plotpoint.gov', password: 'password123', role: 'admin' },
];

const mockProperties: Property[] = [
  {
    id: 'p1',
    title: 'Plot 42, Block B',
    estate: 'Sunrise Valley Estate',
    location: 'Umuahia',
    price: 15000000,
    status: 'available',
    type: 'land',
    plotSize: '500 sqm',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80'
    ],
    videos: ['https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
    coordinates: [5.5267, 7.4898],
  },
  {
    id: 'p2',
    title: '3-Bedroom Bungalow',
    estate: 'Aba South Housing Scheme',
    location: 'Aba',
    price: 45000000,
    status: 'available',
    type: 'house',
    plotSize: '300 sqm',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    coordinates: [5.1066, 7.3697],
  },
  {
    id: 'p3',
    title: 'Plot 12, Phase 1',
    estate: 'Ogbor Hill Enclave',
    location: 'Aba',
    price: 25000000,
    status: 'reserved',
    type: 'land',
    plotSize: '1000 sqm',
    images: ['https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80'],
    coordinates: [5.1189, 7.3820],
  },
  {
    id: 'p4',
    title: 'Luxury 4-Bedroom Duplex',
    estate: 'Sunrise Valley Estate',
    location: 'Umuahia',
    price: 85000000,
    status: 'available',
    type: 'house',
    plotSize: '600 sqm',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    coordinates: [5.5280, 7.4912],
  },
  {
    id: 'p5',
    title: 'Plot 43, Block B',
    estate: 'Sunrise Valley Estate',
    location: 'Umuahia',
    price: 15000000,
    status: 'sold',
    type: 'land',
    plotSize: '500 sqm',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
    coordinates: [5.5292, 7.4925],
  },
  {
    id: 'p6',
    title: 'Plot 44, Block B',
    estate: 'Sunrise Valley Estate',
    location: 'Umuahia',
    price: 15000000,
    status: 'pending_allocation',
    type: 'land',
    plotSize: '500 sqm',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
    coordinates: [5.5305, 7.4938],
  }
];

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    propertyId: 'p3',
    buyerId: 'u1',
    reservedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    status: 'approved',
  }
];

const mockReviews: Review[] = [
  {
    id: 'rev1',
    propertyId: 'p1',
    buyerId: 'u1',
    rating: 5,
    comment: 'Excellent property! Visited the site and it looks exactly like the pictures.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev2',
    propertyId: 'p5',
    buyerId: 'u1',
    rating: 4,
    comment: 'Great location, smooth transaction process.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const useStore = create<State>()(
  persist(
    (set) => ({
      currentUser: mockUsers[0],
      users: mockUsers,
      properties: mockProperties,
      reservations: mockReservations,
      favorites: [
        { propertyId: 'p1', buyerId: 'u1' },
        { propertyId: 'p4', buyerId: 'u1' }
      ],
      reviews: mockReviews,
      setCurrentUser: (user) => set({ currentUser: user }),
      reserveProperty: (propertyId, buyerId) => set((state) => ({
        properties: state.properties.map(p => 
          p.id === propertyId ? { ...p, status: 'reserved' } : p
        ),
        reservations: [...state.reservations, {
          id: `r-${Date.now()}`,
          propertyId,
          buyerId,
          reservedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
        }]
      })),
      addFavorite: (propertyId, buyerId) => set((state) => {
        const exists = state.favorites.some(f => f.propertyId === propertyId && f.buyerId === buyerId);
        if (exists) return state;
        return {
          favorites: [...state.favorites, { propertyId, buyerId }]
        };
      }),
      removeFavorite: (propertyId, buyerId) => set((state) => ({
        favorites: state.favorites.filter(f => !(f.propertyId === propertyId && f.buyerId === buyerId))
      })),
      addReview: (review) => set((state) => ({
        reviews: [
          {
            ...review,
            id: `rev-${Date.now()}`,
            createdAt: new Date().toISOString(),
          },
          ...state.reviews
        ]
      })),
      addProperty: (property) => set((state) => ({
        properties: [
          {
            ...property,
            id: `p-${Date.now()}`,
          },
          ...state.properties
        ]
      })),
      addUser: (user) => set((state) => ({
        users: [
          ...state.users,
          { ...user, id: `u-${Date.now()}` }
        ]
      })),
    }),
    {
      name: 'plotpoint-auth',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);