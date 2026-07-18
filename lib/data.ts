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
