'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, SlidersHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { vendors, formatCount, categories } from '@/lib/data';
import { useState } from 'react';

export default function VendorsPage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = vendors.filter((v) => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCat && v.category !== selectedCat) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white">
          Vendors
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover businesses and vendors around you
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="h-11 rounded-full pl-10"
          />
        </div>
        <Button variant="outline" className="rounded-full">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setSelectedCat(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !selectedCat ? 'bg-warm-orange-gradient text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCat(cat.name)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCat === cat.name ? 'bg-warm-orange-gradient text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vendor, i) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/vendors/${vendor.id}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-xl">
                <div className="relative h-32 overflow-hidden">
                  <img src={vendor.cover} alt={vendor.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="-mt-12 mb-3 flex items-end gap-3">
                    <img src={vendor.avatar} alt={vendor.name} className="h-16 w-16 rounded-2xl border-4 border-card object-cover" />
                    <div className="pb-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-navy dark:text-white">{vendor.name}</h3>
                        {vendor.verified && <VerifiedBadge className="h-4 w-4" />}
                      </div>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {vendor.location}, {vendor.city}
                      </p>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{vendor.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {vendor.rating}
                      </span>
                      <span className="text-muted-foreground">{formatCount(vendor.followers)} followers</span>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary">{vendor.category}</Badge>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
