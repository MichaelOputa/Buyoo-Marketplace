'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  MapPin,
  Star,
  Phone,
  Globe,
  MoreHorizontal,
  UserPlus,
  MessageSquare,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { type Product, type Vendor, formatPrice, formatCount } from '@/lib/data';
import { cn } from '@/lib/utils';

interface MarketplaceCardProps {
  product: Product;
  vendor: Vendor;
}

export function MarketplaceCard({ product, vendor }: MarketplaceCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        {/* Vendor header */}
        <div className="flex items-center gap-3 p-4">
          <Link href={`/vendors/${vendor.id}`}>
            <img
              src={vendor.avatar}
              alt={vendor.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div className="flex-1">
            <Link href={`/vendors/${vendor.id}`} className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-navy dark:text-white">
                {vendor.name}
              </span>
              {vendor.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
            </Link>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {vendor.location}, {vendor.city}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-colors hover:bg-secondary hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href={`tel:${vendor.phone}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label="Call"
            >
              <Phone className="h-4 w-4" />
            </a>
            {vendor.website && (
              <a
                href={`https://${vendor.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showActions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-2 border-y border-border bg-muted/30 px-4 py-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFollowing(!following)}
              className={cn('text-xs', following && 'text-secondary')}
            >
              <UserPlus className="mr-1 h-3.5 w-3.5" />
              {following ? 'Following' : 'Follow Vendor'}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <MessageSquare className="mr-1 h-3.5 w-3.5" /> Contact Vendor
            </Button>
            <Button variant="ghost" size="sm" className="ml-auto text-xs text-destructive">
              <Flag className="mr-1 h-3.5 w-3.5" /> Report
            </Button>
          </motion.div>
        )}

        {/* Product image */}
        <Link href={`/marketplace/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImage(i);
                    }}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === currentImage ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                    )}
                  />
                ))}
              </div>
            )}
            {product.sponsored && (
              <Badge className="absolute left-3 top-3 bg-warm-orange-gradient text-white">
                Sponsored
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute right-3 top-3 bg-destructive text-white">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
        </Link>

        {/* Actions bar */}
        <div className="flex items-center gap-1 px-4 pt-3">
          <button
            onClick={() => setLiked(!liked)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted',
              liked ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            <Heart className={cn('h-5 w-5', liked && 'fill-destructive')} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={cn(
              'ml-auto flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted',
              saved ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Bookmark className={cn('h-5 w-5', saved && 'fill-primary')} />
          </button>
        </div>

        {/* Product info */}
        <div className="p-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-navy dark:text-white">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
          <Link href={`/marketplace/${product.id}`}>
            <h3 className="mt-1 font-medium text-navy dark:text-white hover:text-primary">
              {product.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.caption}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {product.rating} ({product.reviewCount})
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {formatCount(product.likes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> {formatCount(product.comments)}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
