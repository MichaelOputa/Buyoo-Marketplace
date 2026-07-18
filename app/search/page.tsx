'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  X,
  TrendingUp,
  Store,
  Package,
  Wrench,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
import { VerifiedBadge } from '@/components/verified-badge';
import { MarketplaceCard } from '@/components/marketplace-card';
import { products, vendors, categories, getVendorById, formatPrice, formatCount } from '@/lib/data';
import { cn } from '@/lib/utils';

const searchSuggestions = [
  'iPhone 15', 'Toyota Camry', 'Ankara gown', 'Organic vegetables',
  'Home renovation', 'Jollof rice', 'Samsung TV', 'Real estate',
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'vendors' | 'services'>('all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState('relevance');

  const results = useMemo(() => {
    let filteredProducts = products.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.caption.toLowerCase().includes(query.toLowerCase()) && !p.category.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab === 'vendors' || activeTab === 'services') return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedRating > 0 && p.rating < selectedRating) return false;
      if (selectedLocation && p.city !== selectedLocation) return false;
      return true;
    });

    let filteredVendors = vendors.filter((v) => {
      if (query && !v.name.toLowerCase().includes(query.toLowerCase()) && !v.description.toLowerCase().includes(query.toLowerCase()) && !v.category.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab === 'products') return false;
      if (activeTab === 'services' && v.category !== 'Services') return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(v.category)) return false;
      if (selectedRating > 0 && v.rating < selectedRating) return false;
      if (selectedLocation && v.city !== selectedLocation) return false;
      return true;
    });

    if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
      filteredVendors.sort((a, b) => b.rating - a.rating);
    }

    return { products: filteredProducts, vendors: filteredVendors };
  }, [query, activeTab, selectedCategories, priceRange, selectedRating, selectedLocation, sortBy]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search products, vendors or services near you..."
          className="h-14 rounded-2xl border-border/60 bg-muted/30 pl-12 pr-12 text-base shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && !query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 mt-2 w-full rounded-2xl border border-border bg-card p-4 shadow-xl"
            >
              <p className="mb-2 text-xs font-medium text-muted-foreground">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {[
          { id: 'all', label: 'All', icon: Search },
          { id: 'products', label: 'Products', icon: Package },
          { id: 'vendors', label: 'Vendors', icon: Store },
          { id: 'services', label: 'Services', icon: Wrench },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id ? 'bg-warm-orange-gradient text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <div className="hidden lg:block">
          <Card className="sticky top-20 p-5">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-navy dark:text-white">Filters</h3>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000000}
                  step={50000}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span>₦{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-9 rounded-lg">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any location</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                    <SelectItem value="Ibadan">Ibadan</SelectItem>
                    <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Minimum Rating</Label>
                <div className="flex gap-1">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={cn(
                        'flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors',
                        selectedRating === rating ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {rating > 0 && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Categories</Label>
                <div className="space-y-2">
                  {categories.slice(0, 6).map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <Checkbox
                        id={cat.name}
                        checked={selectedCategories.includes(cat.name)}
                        onCheckedChange={() => toggleCategory(cat.name)}
                      />
                      <Label htmlFor={cat.name} className="cursor-pointer text-sm">{cat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 10000000]);
                  setSelectedRating(0);
                  setSelectedLocation('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {results.products.length + results.vendors.length} results
              {query && ` for "${query}"`}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendor results */}
          {results.vendors.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
                <Store className="h-5 w-5 text-primary" /> Vendors
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.vendors.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link href={`/vendors/${vendor.id}`}>
                      <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                        <img src={vendor.avatar} alt={vendor.name} className="h-12 w-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h3 className="flex items-center gap-1 text-sm font-semibold text-navy dark:text-white">
                            {vendor.name}
                            {vendor.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                          </h3>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {vendor.city}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {vendor.rating}
                        </Badge>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Product results */}
          {results.products.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
                <Package className="h-5 w-5 text-primary" /> Products
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.products.map((product) => {
                  const vendor = getVendorById(product.vendorId);
                  if (!vendor) return null;
                  return <MarketplaceCard key={product.id} product={product} vendor={vendor} />;
                })}
              </div>
            </div>
          )}

          {results.products.length === 0 && results.vendors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-navy dark:text-white">No results found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try different keywords or adjust your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
