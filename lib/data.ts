export const categories = [
  { name: 'Electronics', icon: 'Smartphone', count: '12.4k', color: 'bg-blue-500/10 text-blue-600' },
  { name: 'Fashion', icon: 'Shirt', count: '8.7k', color: 'bg-pink-500/10 text-pink-600' },
  { name: 'Vehicles', icon: 'Car', count: '3.2k', color: 'bg-orange-500/10 text-orange-600' },
  { name: 'Agriculture', icon: 'Sprout', count: '5.1k', color: 'bg-green-500/10 text-green-600' },
  { name: 'Restaurants', icon: 'UtensilsCrossed', count: '2.8k', color: 'bg-red-500/10 text-red-600' },
  { name: 'Real Estate', icon: 'Home', count: '4.5k', color: 'bg-indigo-500/10 text-indigo-600' },
  { name: 'Health & Beauty', icon: 'HeartPulse', count: '6.3k', color: 'bg-rose-500/10 text-rose-600' },
  { name: 'Services', icon: 'Wrench', count: '9.1k', color: 'bg-amber-500/10 text-amber-600' },
];

export const promoImages = [
  { src: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Markets' },
  { src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Restaurants' },
  { src: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Electronics' },
  { src: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Fashion' },
  { src: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Agriculture' },
  { src: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Vehicles' },
  { src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Local Businesses' },
];

export interface Vendor {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  cover: string;
  location: string;
  city: string;
  state: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  followers: number;
  following: number;
  products: number;
  description: string;
  category: string;
  businessHours: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  joinedDate: string;
}

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'TechHub Lagos',
    handle: '@techhublagos',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/768109/pexels-photo-768109.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    verified: true,
    rating: 4.8,
    reviewCount: 234,
    followers: 12400,
    following: 89,
    products: 56,
    description: 'Premium electronics retailer specializing in smartphones, laptops, and accessories. Authorized dealer for Samsung, Apple, and Xiaomi.',
    category: 'Electronics',
    businessHours: 'Mon-Sat: 9am - 8pm',
    phone: '+234 801 234 5678',
    whatsapp: '+234 801 234 5678',
    email: 'hello@techhublagos.com',
    website: 'techhublagos.com',
    joinedDate: 'Jan 2023',
  },
  {
    id: '2',
    name: 'Ada\'s Fashion House',
    handle: '@adasfashion',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Surulere',
    city: 'Lagos',
    state: 'Lagos',
    verified: true,
    rating: 4.9,
    reviewCount: 412,
    followers: 28900,
    following: 120,
    products: 134,
    description: 'Contemporary African fashion brand. Custom tailoring, ready-to-wear collections, and traditional attire for all occasions.',
    category: 'Fashion',
    businessHours: 'Mon-Sat: 10am - 7pm',
    phone: '+234 802 345 6789',
    whatsapp: '+234 802 345 6789',
    email: 'orders@adasfashion.com',
    website: 'adasfashion.com',
    joinedDate: 'Mar 2022',
  },
  {
    id: '3',
    name: 'GreenFarm Produce',
    handle: '@greenfarm',
    avatar: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Ibadan',
    city: 'Ibadan',
    state: 'Oyo',
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    followers: 8200,
    following: 45,
    products: 78,
    description: 'Farm-fresh produce delivered to your doorstep. Organic vegetables, fruits, grains, and livestock products from local farms.',
    category: 'Agriculture',
    businessHours: 'Mon-Sun: 7am - 6pm',
    phone: '+234 803 456 7890',
    whatsapp: '+234 803 456 7890',
    email: 'farm@greenfarm.com',
    website: 'greenfarm.com',
    joinedDate: 'Jun 2023',
  },
  {
    id: '4',
    name: 'AutoDeals Nigeria',
    handle: '@autodealsng',
    avatar: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Wuse 2',
    city: 'Abuja',
    state: 'FCT',
    verified: true,
    rating: 4.6,
    reviewCount: 98,
    followers: 15600,
    following: 67,
    products: 42,
    description: 'Certified pre-owned and brand new vehicles. We offer inspection, financing, and trade-in services across Nigeria.',
    category: 'Vehicles',
    businessHours: 'Mon-Sat: 8am - 6pm',
    phone: '+234 804 567 8901',
    whatsapp: '+234 804 567 8901',
    email: 'sales@autodealsng.com',
    website: 'autodealsng.com',
    joinedDate: 'Feb 2023',
  },
  {
    id: '5',
    name: 'Spice Route Kitchen',
    handle: '@spiceroute',
    avatar: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos',
    verified: false,
    rating: 4.5,
    reviewCount: 287,
    followers: 19300,
    following: 34,
    products: 24,
    description: 'Pan-African restaurant and catering service. Order online for delivery or pickup. Specializing in jollof, suya, and continental dishes.',
    category: 'Restaurants',
    businessHours: 'Mon-Sun: 11am - 11pm',
    phone: '+234 805 678 9012',
    whatsapp: '+234 805 678 9012',
    email: 'order@spiceroute.com',
    website: 'spiceroute.com',
    joinedDate: 'Sep 2023',
  },
  {
    id: '6',
    name: 'BuildRight Construction',
    handle: '@buildright',
    avatar: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=200',
    cover: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    location: 'Port Harcourt',
    city: 'Port Harcourt',
    state: 'Rivers',
    verified: true,
    rating: 4.8,
    reviewCount: 76,
    followers: 5400,
    following: 23,
    products: 15,
    description: 'Custom vendor for construction projects. We handle building, renovations, interior design, and project management with free quotations.',
    category: 'Services',
    businessHours: 'Mon-Fri: 8am - 5pm',
    phone: '+234 806 789 0123',
    whatsapp: '+234 806 789 0123',
    email: 'projects@buildright.com',
    website: 'buildright.com',
    joinedDate: 'Oct 2023',
  },
];

export interface Product {
  id: string;
  vendorId: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  caption: string;
  location: string;
  city: string;
  state: string;
  category: string;
  rating: number;
  reviewCount: number;
  likes: number;
  comments: number;
  shares: number;
  sponsored?: boolean;
  trending?: boolean;
  featured?: boolean;
  condition: string;
  delivery: string;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    vendorId: '1',
    title: 'iPhone 15 Pro Max 256GB',
    price: 1250000,
    originalPrice: 1450000,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Brand new iPhone 15 Pro Max, 256GB, Natural Titanium. Sealed with 1-year warranty. Free delivery within Lagos.',
    location: 'Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 45,
    likes: 1240,
    comments: 89,
    shares: 34,
    sponsored: true,
    trending: true,
    condition: 'New',
    delivery: 'Nationwide',
    createdAt: '2024-01-15',
  },
  {
    id: 'p2',
    vendorId: '2',
    title: 'Custom Ankara Evening Gown',
    price: 45000,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Beautifully crafted Ankara evening gown. Custom fitting available. Perfect for weddings and special occasions.',
    location: 'Surulere',
    city: 'Lagos',
    state: 'Lagos',
    category: 'Fashion',
    rating: 4.8,
    reviewCount: 67,
    likes: 890,
    comments: 45,
    shares: 12,
    trending: true,
    featured: true,
    condition: 'Made to order',
    delivery: 'Nationwide',
    createdAt: '2024-01-14',
  },
  {
    id: 'p3',
    vendorId: '3',
    title: 'Fresh Organic Vegetables Basket',
    price: 8500,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Weekly basket of farm-fresh organic vegetables. Variety of seasonal produce. Delivered every Saturday morning.',
    location: 'Ibadan',
    city: 'Ibadan',
    state: 'Oyo',
    category: 'Agriculture',
    rating: 4.7,
    reviewCount: 34,
    likes: 567,
    comments: 23,
    shares: 8,
    featured: true,
    condition: 'Fresh',
    delivery: 'Ibadan & Lagos',
    createdAt: '2024-01-13',
  },
  {
    id: 'p4',
    vendorId: '4',
    title: 'Toyota Camry 2018 (Foreign Used)',
    price: 8500000,
    originalPrice: 9200000,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Clean Toyota Camry 2018, foreign used. Full options, sunroof, leather interior. Accident-free with clean papers.',
    location: 'Wuse 2',
    city: 'Abuja',
    state: 'FCT',
    category: 'Vehicles',
    rating: 4.6,
    reviewCount: 12,
    likes: 2100,
    comments: 156,
    shares: 89,
    sponsored: true,
    condition: 'Foreign Used',
    delivery: 'Pickup',
    createdAt: '2024-01-12',
  },
  {
    id: 'p5',
    vendorId: '5',
    title: 'Jollof Rice Party Tray (Large)',
    price: 15000,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Large party tray of our signature jollof rice. Serves 15-20 people. Order 24 hours in advance. Free delivery on the Island.',
    location: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos',
    category: 'Restaurants',
    rating: 4.5,
    reviewCount: 89,
    likes: 1450,
    comments: 67,
    shares: 45,
    trending: true,
    condition: 'Fresh',
    delivery: 'Lagos Island',
    createdAt: '2024-01-11',
  },
  {
    id: 'p6',
    vendorId: '6',
    title: 'Home Renovation Quote',
    price: 0,
    currency: '₦',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    caption: 'Request a free quotation for your home renovation project. We handle tiling, painting, plumbing, and electrical work.',
    location: 'Port Harcourt',
    city: 'Port Harcourt',
    state: 'Rivers',
    category: 'Services',
    rating: 4.8,
    reviewCount: 23,
    likes: 340,
    comments: 12,
    shares: 5,
    featured: true,
    condition: 'Service',
    delivery: 'Rivers State',
    createdAt: '2024-01-10',
  },
];

export function formatPrice(price: number, currency: string = '₦') {
  if (price === 0) return 'Request Quote';
  return `${currency}${price.toLocaleString('en-NG')}`;
}

export function getVendorById(id: string) {
  return vendors.find((v) => v.id === id);
}

export function getProductsByVendor(vendorId: string) {
  return products.filter((p) => p.vendorId === vendorId);
}

export function formatCount(count: number) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

// Nearby delivery riders
export interface Rider {
  id: string;
  name: string;
  avatar: string;
  vehicle: 'Bike' | 'Motorcycle' | 'Car' | 'Van';
  rating: number;
  deliveries: number;
  distanceKm: number;
  city: string;
  state: string;
  available: boolean;
  rateFrom: number;
  phone: string;
}

export const riders: Rider[] = [
  {
    id: 'r1',
    name: 'Emeka Okoro',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    vehicle: 'Motorcycle',
    rating: 4.9,
    deliveries: 1240,
    distanceKm: 1.2,
    city: 'Lagos',
    state: 'Lagos',
    available: true,
    rateFrom: 500,
    phone: '+234 810 111 2222',
  },
  {
    id: 'r2',
    name: 'Fatima Bello',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    vehicle: 'Car',
    rating: 4.8,
    deliveries: 890,
    distanceKm: 2.8,
    city: 'Abuja',
    state: 'FCT',
    available: true,
    rateFrom: 1500,
    phone: '+234 811 222 3333',
  },
  {
    id: 'r3',
    name: 'Samuel Adeyemi',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    vehicle: 'Bike',
    rating: 4.7,
    deliveries: 560,
    distanceKm: 0.8,
    city: 'Lagos',
    state: 'Lagos',
    available: false,
    rateFrom: 300,
    phone: '+234 812 333 4444',
  },
  {
    id: 'r4',
    name: 'Grace Eze',
    avatar: 'https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&w=200',
    vehicle: 'Van',
    rating: 4.9,
    deliveries: 2100,
    distanceKm: 4.5,
    city: 'Port Harcourt',
    state: 'Rivers',
    available: true,
    rateFrom: 2500,
    phone: '+234 813 444 5555',
  },
];

// Nearby errand professionals (PEP)
export interface ErrandPro {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  tasks: number;
  distanceKm: number;
  city: string;
  state: string;
  available: boolean;
  rateFrom: number;
  skills: string[];
  phone: string;
}

export const errandPros: ErrandPro[] = [
  {
    id: 'e1',
    name: 'Chioma Nwosu',
    avatar: 'https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&w=200',
    specialty: 'Errand Runner',
    rating: 4.9,
    tasks: 340,
    distanceKm: 1.5,
    city: 'Lagos',
    state: 'Lagos',
    available: true,
    rateFrom: 1000,
    skills: ['Grocery shopping', 'Bill payments', 'Document delivery', 'Queueing'],
    phone: '+234 820 111 2222',
  },
  {
    id: 'e2',
    name: 'Yusuf Ibrahim',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    specialty: 'Dispatch Agent',
    rating: 4.8,
    tasks: 520,
    distanceKm: 2.1,
    city: 'Abuja',
    state: 'FCT',
    available: true,
    rateFrom: 1500,
    skills: ['Document delivery', 'Bank errands', 'Pickups', 'Government parastatals'],
    phone: '+234 821 222 3333',
  },
  {
    id: 'e3',
    name: 'Aisha Mohammed',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    specialty: 'Personal Shopper',
    rating: 4.7,
    tasks: 180,
    distanceKm: 3.4,
    city: 'Lagos',
    state: 'Lagos',
    available: false,
    rateFrom: 1200,
    skills: ['Grocery shopping', 'Market runs', 'Gift sourcing', 'Clothing pickup'],
    phone: '+234 822 333 4444',
  },
  {
    id: 'e4',
    name: 'Daniel Okafor',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    specialty: 'Errand Runner',
    rating: 4.9,
    tasks: 610,
    distanceKm: 0.6,
    city: 'Ibadan',
    state: 'Oyo',
    available: true,
    rateFrom: 800,
    skills: ['Bill payments', 'Document delivery', 'Pharmacy runs', 'Bank errands'],
    phone: '+234 823 444 5555',
  },
];

// Nearby physical markets with traditional market days
export interface Market {
  id: string;
  name: string;
  image: string;
  city: string;
  state: string;
  address: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  // ISO weekday index: 0=Sun ... 6=Sat. Empty array = open daily.
  marketDays: number[];
  openTime: string;
  closeTime: string;
  categories: string[];
  description: string;
}

export const markets: Market[] = [
  {
    id: 'm1',
    name: 'Itam Market',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Uyo',
    state: 'Akwa Ibom',
    address: 'Itam Junction, Itu Road, Uyo',
    rating: 4.4,
    reviewCount: 320,
    distanceKm: 3.2,
    marketDays: [2, 5], // Tuesday & Friday
    openTime: '7:00 AM',
    closeTime: '6:00 PM',
    categories: ['Fresh food', 'Clothing', 'Electronics', 'Household'],
    description: 'One of the largest traditional markets in Akwa Ibom. Fresh produce, textiles, and household goods every market day.',
  },
  {
    id: 'm2',
    name: 'Mile 12 Market',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Lagos',
    state: 'Lagos',
    address: 'Mile 12, Ikorodu Road, Lagos',
    rating: 4.3,
    reviewCount: 890,
    distanceKm: 5.8,
    marketDays: [], // daily
    openTime: '6:00 AM',
    closeTime: '8:00 PM',
    categories: ['Fresh food', 'Groceries', 'Spices', 'Livestock'],
    description: 'Lagos\'s busiest fresh food market. Open daily with the best prices on produce, spices, and livestock.',
  },
  {
    id: 'm3',
    name: 'Wuse Market',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Abuja',
    state: 'FCT',
    address: 'Wuse Zone 5, Abuja',
    rating: 4.5,
    reviewCount: 540,
    distanceKm: 2.4,
    marketDays: [],
    openTime: '8:00 AM',
    closeTime: '9:00 PM',
    categories: ['Clothing', 'Electronics', 'Fresh food', 'Crafts'],
    description: 'Modern market in the heart of Abuja. Everything from fresh produce to fashion and electronics under one roof.',
  },
  {
    id: 'm4',
    name: 'Oyingbo Market',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Lagos',
    state: 'Lagos',
    address: 'Oyingbo, Lagos Island',
    rating: 4.2,
    reviewCount: 430,
    distanceKm: 4.1,
    marketDays: [1, 4], // Monday & Thursday
    openTime: '6:30 AM',
    closeTime: '7:00 PM',
    categories: ['Fresh food', 'Groceries', 'Provisions', 'Household'],
    description: 'Historic Lagos market known for wholesale provisions and fresh food. Peaks on Mondays and Thursdays.',
  },
  {
    id: 'm5',
    name: 'Bodija Market',
    image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Ibadan',
    state: 'Oyo',
    address: 'Bodija, Ibadan',
    rating: 4.3,
    reviewCount: 280,
    distanceKm: 2.0,
    marketDays: [],
    openTime: '7:00 AM',
    closeTime: '7:00 PM',
    categories: ['Fresh food', 'Groceries', 'Tubers', 'Grains'],
    description: 'Ibadan\'s premier food market. Famous for tubers, grains, and farm-fresh produce at wholesale prices.',
  },
];

export const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function isMarketOpenToday(market: Market, date: Date = new Date()): boolean {
  if (market.marketDays.length === 0) return true;
  return market.marketDays.includes(date.getDay());
}

export function isMarketOpenNow(market: Market, date: Date = new Date()): boolean {
  if (!isMarketOpenToday(market, date)) return false;
  const now = date.toLocaleTimeString('en-NG', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const open = market.openTime.replace(/[:\s]/g, '').padStart(4, '0');
  const close = market.closeTime.replace(/[:\s]/g, '').padStart(4, '0');
  return now >= open && now <= close;
}

export function formatMarketDays(market: Market): string {
  if (market.marketDays.length === 0) return 'Open daily';
  return market.marketDays.map((d) => weekdayNames[d]).join(' & ');
}
