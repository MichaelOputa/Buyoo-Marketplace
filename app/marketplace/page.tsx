'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, TrendingUp, Sparkles, Video, MapPin } from 'lucide-react';
import { MarketplaceCard } from '@/components/marketplace-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { products, vendors, categories, getVendorById } from '@/lib/data';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function MarketplacePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [activeTab, setActiveTab] = useState<'all' | 'sponsored' | 'trending' | 'video'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'sponsored' && !p.sponsored) return false;
    if (activeTab === 'trending' && !p.trending) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy dark:text-white">
            Marketplace
          </h1>
          <p className="mt-1 text-muted-foreground">
            Discover products and services from vendors near you
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 w-[180px] rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <Label>Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    step={50000}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₦{priceRange[0].toLocaleString()}</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Categories</Label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-2">
                        <Checkbox
                          id={cat.name}
                          checked={selectedCategories.includes(cat.name)}
                          onCheckedChange={() => toggleCategory(cat.name)}
                        />
                        <Label htmlFor={cat.name} className="cursor-pointer text-sm">
                          {cat.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Distance</Label>
                  <Select>
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue placeholder="Any distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 km</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="50">Within 50 km</SelectItem>
                      <SelectItem value="any">Any distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Rating</Label>
                  <Select>
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5 & above</SelectItem>
                      <SelectItem value="4">4.0 & above</SelectItem>
                      <SelectItem value="3">3.0 & above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="in-stock" />
                      <Label htmlFor="in-stock" className="cursor-pointer text-sm">In Stock</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer text-sm">Delivery Available</Label>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-warm-orange-gradient"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: 'all', label: 'All Posts', icon: Sparkles },
          { id: 'sponsored', label: 'Sponsored', icon: TrendingUp },
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'video', label: 'Video Ads', icon: Video },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-warm-orange-gradient text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Featured vendors banner */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-navy dark:text-white">Featured Vendors</h3>
            <p className="text-sm text-muted-foreground">Top-rated businesses this week</p>
          </div>
          <div className="flex -space-x-2">
            {vendors.slice(0, 5).map((v) => (
              <img
                key={v.id}
                src={v.avatar}
                alt={v.name}
                className="h-10 w-10 rounded-full border-2 border-card object-cover"
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Feed */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => {
          const vendor = getVendorById(product.vendorId);
          if (!vendor) return null;
          return (
            <MarketplaceCard key={product.id} product={product} vendor={vendor} />
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-navy dark:text-white">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange([0, 10000000]);
              setActiveTab('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
