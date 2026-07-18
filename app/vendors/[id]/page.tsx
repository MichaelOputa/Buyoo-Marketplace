'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Clock,
  ChevronLeft,
  UserPlus,
  Share2,
  Image as ImageIcon,
  Video,
  Package,
  Grid3x3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VerifiedBadge } from '@/components/verified-badge';
import { MarketplaceCard } from '@/components/marketplace-card';
import { vendors, getProductsByVendor, formatPrice, formatCount } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function VendorProfilePage() {
  const params = useParams();
  const vendorId = params.id as string;
  const vendor = vendors.find((v) => v.id === vendorId);
  const [following, setFollowing] = useState(false);

  if (!vendor) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
          Vendor not found
        </h1>
        <Link href="/vendors">
          <Button className="mt-4 bg-warm-orange-gradient">Browse Vendors</Button>
        </Link>
      </div>
    );
  }

  const vendorProducts = getProductsByVendor(vendor.id);
  const gallery = vendorProducts.flatMap((p) => p.images).slice(0, 9);

  const reviews = [
    { name: 'Adebayo K.', avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, date: '3 days ago', text: 'Great vendor! Very professional and products are top quality.' },
    { name: 'Zainab M.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 4, date: '1 week ago', text: 'Good service. Delivery was a bit late but product quality made up for it.' },
    { name: 'Tunde A.', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, date: '2 weeks ago', text: 'Excellent customer service. Highly recommended!' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-0 py-0 md:px-6 md:py-6">
      <Link href="/vendors" className="mb-4 ml-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-0">
        <ChevronLeft className="h-4 w-4" /> All Vendors
      </Link>

      {/* Cover & Profile */}
      <div className="px-4 md:px-0">
        <div className="relative h-48 overflow-hidden rounded-none md:h-64 md:rounded-3xl">
          <img src={vendor.cover} alt={vendor.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        </div>

        <div className="relative -mt-16 flex flex-col gap-4 px-4 md:flex-row md:items-end md:px-6">
          <img
            src={vendor.avatar}
            alt={vendor.name}
            className="h-28 w-28 rounded-3xl border-4 border-card object-cover md:h-32 md:w-32"
          />
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
                {vendor.name}
              </h1>
              {vendor.verified && <VerifiedBadge className="h-5 w-5" />}
            </div>
            <p className="text-sm text-muted-foreground">{vendor.handle}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" /> {vendor.location}, {vendor.city}, {vendor.state}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {vendor.rating} ({vendor.reviewCount})
              </span>
              <span className="text-muted-foreground">{formatCount(vendor.followers)} followers</span>
            </div>
          </div>
          <div className="flex gap-2 pb-2">
            <Button
              onClick={() => setFollowing(!following)}
              className={cn(
                following ? 'bg-muted text-muted-foreground' : 'bg-warm-orange-gradient'
              )}
            >
              <UserPlus className="mr-1.5 h-4 w-4" />
              {following ? 'Following' : 'Follow'}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-2 md:mx-0 md:grid-cols-4 md:gap-3">
        <a href={`https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4 text-secondary" /> WhatsApp
          </Button>
        </a>
        <a href={`tel:${vendor.phone}`}>
          <Button variant="outline" className="w-full justify-start">
            <Phone className="mr-2 h-4 w-4 text-primary" /> Call
          </Button>
        </a>
        <a href={`mailto:${vendor.email}`}>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="mr-2 h-4 w-4 text-blue-600" /> Email
          </Button>
        </a>
        <a href={`https://${vendor.website}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full justify-start">
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> Website
          </Button>
        </a>
      </div>

      {/* Tabs */}
      <div className="mt-6 px-4 md:px-0">
        <Tabs defaultValue="products">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="products"><Package className="mr-1.5 h-4 w-4" /> Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="gallery"><ImageIcon className="mr-1.5 h-4 w-4" /> Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="location"><MapPin className="mr-1.5 h-4 w-4" /> Location</TabsTrigger>
          </TabsList>

          {/* Products */}
          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vendorProducts.map((p) => (
                <MarketplaceCard key={p.id} product={p} vendor={vendor} />
              ))}
            </div>
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 md:col-span-2">
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white">
                  About {vendor.name}
                </h3>
                <p className="mt-3 text-muted-foreground">{vendor.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-navy dark:text-white">
                      {formatCount(vendor.followers)}
                    </div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-navy dark:text-white">
                      {vendor.products}
                    </div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-navy dark:text-white">
                      {vendor.rating}
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white">
                  Business Info
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <InfoRow icon={Clock} label="Hours" value={vendor.businessHours} />
                  <InfoRow icon={MapPin} label="Location" value={`${vendor.location}, ${vendor.city}`} />
                  <InfoRow icon={Phone} label="Phone" value={vendor.phone} />
                  <InfoRow icon={Mail} label="Email" value={vendor.email} />
                  <InfoRow icon={Globe} label="Website" value={vendor.website} />
                  <InfoRow icon={Grid3x3} label="Category" value={vendor.category} />
                </div>
                <div className="mt-4">
                  <Badge className="bg-secondary/10 text-secondary">
                    Member since {vendor.joinedDate}
                  </Badge>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square overflow-hidden rounded-xl"
                >
                  <img src={img} alt="" className="h-full w-full object-cover transition-transform hover:scale-110" />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-semibold text-navy dark:text-white">{review.name}</h4>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={cn('h-3 w-3', idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted')} />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Location */}
          <TabsContent value="location" className="mt-6">
            <Card className="overflow-hidden">
              <div className="relative h-80 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-primary" />
                    <p className="mt-2 font-medium text-navy dark:text-white">{vendor.location}</p>
                    <p className="text-sm text-muted-foreground">{vendor.city}, {vendor.state}</p>
                    <Button className="mt-4 bg-warm-orange-gradient">
                      Get Directions
                    </Button>
                  </div>
                </div>
                <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-navy dark:text-white">{value}</p>
      </div>
    </div>
  );
}
