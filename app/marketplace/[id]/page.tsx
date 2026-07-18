'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Heart,
  Share2,
  Bookmark,
  Flag,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Globe,
  Shield,
  Truck,
  CheckCircle2,
  Minus,
  Plus,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { VerifiedBadge } from '@/components/verified-badge';
import { MarketplaceCard } from '@/components/marketplace-card';
import { products, getVendorById, getProductsByVendor, formatPrice, formatCount } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
          Product not found
        </h1>
        <Link href="/marketplace">
          <Button className="mt-4 bg-warm-orange-gradient">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const vendor = getVendorById(product.vendorId);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const vendorProducts = getProductsByVendor(product.vendorId).filter((p) => p.id !== product.id).slice(0, 4);

  const reviews = [
    { name: 'Chioma O.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, date: '2 days ago', text: 'Excellent product! Exactly as described. Fast delivery and great communication from the vendor.' },
    { name: 'Emeka N.', avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 4, date: '1 week ago', text: 'Good quality product. Packaging could be better but the item itself is great value for money.' },
    { name: 'Fatima A.', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, date: '2 weeks ago', text: 'Highly recommend! The vendor was very responsive and the product exceeded my expectations.' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <Link href="/marketplace" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square overflow-hidden rounded-3xl bg-muted"
          >
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {product.sponsored && (
              <Badge className="absolute left-4 top-4 bg-warm-orange-gradient text-white">
                Sponsored
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute right-4 top-4 bg-destructive text-white text-sm">
                Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </motion.div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    'h-20 w-20 overflow-hidden rounded-xl border-2 transition-all',
                    i === currentImage ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {product.category}
            </Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-navy dark:text-white md:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {product.location}, {product.city}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">{product.caption}</p>

          {/* Delivery */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-secondary/10 px-4 py-2 text-sm">
              <Truck className="h-4 w-4 text-secondary" />
              <span className="font-medium text-secondary">{product.delivery}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Buyoo Protected</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">{product.condition}</span>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center self-start rounded-xl border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button className="h-11 flex-1 bg-warm-orange-gradient">
              Buy Now
            </Button>
            <Button variant="outline" className="h-11 sm:flex-none">
              Request Quote
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button
              variant="outline"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn('mr-1.5 h-4 w-4', liked && 'fill-destructive text-destructive')} />
              Like
            </Button>
            <Button
              variant="outline"
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={cn('mr-1.5 h-4 w-4', saved && 'fill-primary text-primary')} />
              Save
            </Button>
            <Button variant="outline">
              <Share2 className="mr-1.5 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="text-destructive">
              <Flag className="mr-1.5 h-4 w-4" /> Report
            </Button>
          </div>

          {/* Vendor card */}
          {vendor && (
            <Link href={`/vendors/${vendor.id}`}>
              <Card className="mt-6 flex items-center gap-4 p-4 transition-all hover:shadow-lg">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-navy dark:text-white">{vendor.name}</h3>
                    {vendor.verified && <VerifiedBadge className="h-4 w-4" />}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatCount(vendor.followers)} followers · {vendor.products} products
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </a>
                  <a
                    href={`tel:${vendor.phone}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </Card>
            </Link>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-navy dark:text-white">
          Reviews ({product.reviewCount})
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy dark:text-white">{review.name}</h4>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={cn(
                            'h-3 w-3',
                            idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-navy dark:text-white">
            Related Products
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => {
              const v = getVendorById(p.vendorId);
              if (!v) return null;
              return <MarketplaceCard key={p.id} product={p} vendor={v} />;
            })}
          </div>
        </section>
      )}

      {/* More from vendor */}
      {vendor && vendorProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-navy dark:text-white">
            More from {vendor.name}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {vendorProducts.map((p) => {
              const v = getVendorById(p.vendorId);
              if (!v) return null;
              return <MarketplaceCard key={p.id} product={p} vendor={v} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
