'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
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
  Bike,
  ShoppingBag,
  Navigation,
  Phone,
  Sparkles,
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
import {
  products,
  vendors,
  categories,
  riders,
  errandPros,
  markets,
  getVendorById,
  formatPrice,
  formatCount,
  isMarketOpenNow,
  formatMarketDays,
} from '@/lib/data';
import { cn } from '@/lib/utils';

function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, any> = {
    Smartphone: Search,
    Shirt: Store,
    Car: Package,
    Sprout: Star,
    UtensilsCrossed: TrendingUp,
    Home: MapPin,
    HeartPulse: Sparkles,
    Wrench: Wrench,
  };
  const Icon = icons[name] || Search;
  return <Icon className="h-6 w-6" />;
}

const searchSuggestions = [
  'iPhone 15', 'Toyota Camry', 'Ankara gown', 'Organic vegetables',
  'Home renovation', 'Jollof rice', 'Samsung TV', 'Real estate',
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'vendors' | 'services' | 'markets' | 'riders' | 'errands'>('all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('any');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    const cat = searchParams.get('cat');
    setSelectedCategories(cat ? [cat] : []);
  }, [searchParams]);

  const results = useMemo(() => {
    let filteredProducts = products.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.caption.toLowerCase().includes(query.toLowerCase()) && !p.category.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab === 'vendors' || activeTab === 'services') return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedRating > 0 && p.rating < selectedRating) return false;
      if (selectedLocation !== 'any' && p.city !== selectedLocation) return false;
      return true;
    });

    let filteredVendors = vendors.filter((v) => {
      if (query && !v.name.toLowerCase().includes(query.toLowerCase()) && !v.description.toLowerCase().includes(query.toLowerCase()) && !v.category.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab === 'products' || activeTab === 'markets' || activeTab === 'riders' || activeTab === 'errands') return false;
      if (activeTab === 'services' && v.category !== 'Services') return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(v.category)) return false;
      if (selectedRating > 0 && v.rating < selectedRating) return false;
      if (selectedLocation !== 'any' && v.city !== selectedLocation) return false;
      return true;
    });

    let filteredMarkets = markets.filter((m) => {
      if (query && !m.name.toLowerCase().includes(query.toLowerCase()) && !m.city.toLowerCase().includes(query.toLowerCase()) && !m.categories.some((c) => c.toLowerCase().includes(query.toLowerCase())) && !m.description.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab !== 'all' && activeTab !== 'markets') return false;
      if (selectedLocation !== 'any' && m.city !== selectedLocation) return false;
      if (selectedRating > 0 && m.rating < selectedRating) return false;
      return true;
    });

    let filteredRiders = riders.filter((r) => {
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) && !r.city.toLowerCase().includes(query.toLowerCase()) && !r.vehicle.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab !== 'all' && activeTab !== 'riders') return false;
      if (selectedLocation && r.city !== selectedLocation) return false;
      if (selectedRating > 0 && r.rating < selectedRating) return false;
      return true;
    });

    let filteredErrands = errandPros.filter((e) => {
      if (query && !e.name.toLowerCase().includes(query.toLowerCase()) && !e.specialty.toLowerCase().includes(query.toLowerCase()) && !e.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) && !e.city.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeTab !== 'all' && activeTab !== 'errands') return false;
      if (selectedLocation && e.city !== selectedLocation) return false;
      if (selectedRating > 0 && e.rating < selectedRating) return false;
      return true;
    });

    if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
      filteredVendors.sort((a, b) => b.rating - a.rating);
      filteredMarkets.sort((a, b) => b.rating - a.rating);
      filteredRiders.sort((a, b) => b.rating - a.rating);
      filteredErrands.sort((a, b) => b.rating - a.rating);
    }

    return { products: filteredProducts, vendors: filteredVendors, markets: filteredMarkets, riders: filteredRiders, errands: filteredErrands };
  }, [query, activeTab, selectedCategories, priceRange, selectedRating, selectedLocation, sortBy]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  const hasQueryOrFilters = query || selectedCategories.length > 0 || selectedRating > 0 || selectedLocation || priceRange[0] > 0 || priceRange[1] < 10000000;

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
          placeholder="Search products, vendors, markets, riders, errands, or locations..."
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
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: 'all', label: 'All', icon: Search },
          { id: 'products', label: 'Products', icon: Package },
          { id: 'vendors', label: 'Vendors', icon: Store },
          { id: 'services', label: 'Services', icon: Wrench },
          { id: 'markets', label: 'Markets', icon: MapPin },
          { id: 'riders', label: 'Riders', icon: Bike },
          { id: 'errands', label: 'Errand Pros', icon: ShoppingBag },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
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
                    <SelectItem value="any">Any location</SelectItem>
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
          {!hasQueryOrFilters ? (
            <DiscoverLanding />
          ) : (
            <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {results.products.length + results.vendors.length + results.markets.length + results.riders.length + results.errands.length} results
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

          {/* Markets results */}
          {results.markets.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
                <MapPin className="h-5 w-5 text-primary" /> Markets
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.markets.map((market, i) => (
                  <motion.div key={market.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href="/nearby">
                      <Card className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative flex h-28 items-center justify-center bg-warm-orange-gradient">
                          <MapPin className="h-10 w-10 text-white/90" />
                          <div className="absolute bottom-2 left-3">
                            <h3 className="font-semibold text-white">{market.name}</h3>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Navigation className="h-3 w-3" /> {market.distanceKm} km · {market.city}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {market.rating}
                            </span>
                            <Badge className={isMarketOpenNow(market) ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                              {isMarketOpenNow(market) ? 'Open now' : 'Closed'}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Riders results */}
          {results.riders.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
                <Bike className="h-5 w-5 text-primary" /> Delivery Riders
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.riders.map((rider, i) => (
                  <motion.div key={rider.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                      <img src={rider.avatar} alt={rider.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-navy dark:text-white">{rider.name}</h3>
                        <p className="text-xs text-muted-foreground">{rider.vehicle} · {rider.city}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {rider.rating}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{formatCount(rider.deliveries)} deliveries</span>
                        </div>
                      </div>
                      <Badge className={rider.available ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                        {rider.available ? 'Available' : 'Busy'}
                      </Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Errand pros results */}
          {results.errands.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
                <ShoppingBag className="h-5 w-5 text-primary" /> Errand Professionals
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.errands.map((pro, i) => (
                  <motion.div key={pro.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                      <img src={pro.avatar} alt={pro.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-semibold text-navy dark:text-white">{pro.name}</h3>
                          <VerifiedBadge className="h-3 w-3" />
                        </div>
                        <p className="text-xs text-primary">{pro.specialty}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {pro.rating}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{formatCount(pro.tasks)} tasks</span>
                        </div>
                      </div>
                      <Badge className={pro.available ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                        {pro.available ? 'Available' : 'Busy'}
                      </Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {results.products.length === 0 && results.vendors.length === 0 && results.markets.length === 0 && results.riders.length === 0 && results.errands.length === 0 && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DiscoverLanding() {
  const trendingSearches = ['Fresh food', 'Smartphones', 'Fashion', 'Errand runner', 'Itam Market', 'Bike delivery'];
  const featuredProducts = products.filter((p) => p.trending || p.sponsored).slice(0, 4);
  const topRiders = [...riders].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const topErrands = [...errandPros].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const topMarkets = [...markets].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Trending searches */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
          <TrendingUp className="h-5 w-5 text-primary" /> Trending searches
        </h2>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
              <Badge variant="secondary" className="cursor-pointer bg-muted/60 px-3 py-1.5 text-sm hover:bg-primary/10 hover:text-primary">
                {term}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
          <Store className="h-5 w-5 text-primary" /> Browse by category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat.name} href={`/search?cat=${encodeURIComponent(cat.name)}`}>
              <Card className="flex items-center gap-3 p-3 transition-all hover:shadow-md hover:border-primary/30">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}>
                  <CategoryIcon name={cat.icon} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy dark:text-white">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
            <Package className="h-5 w-5 text-primary" /> Featured products
          </h2>
          <Link href="/marketplace" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/marketplace/${product.id}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {product.sponsored && (
                      <Badge className="absolute left-2 top-2 bg-warm-orange-gradient text-white">Sponsored</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-sm font-medium text-navy dark:text-white">{product.title}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price, product.currency)}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating} ({product.reviewCount})
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nearby markets */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
            <MapPin className="h-5 w-5 text-primary" /> Nearby markets
          </h2>
          <Link href="/nearby" className="text-sm text-primary hover:underline">Explore nearby</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topMarkets.map((market, i) => (
            <motion.div key={market.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href="/nearby">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative flex h-24 items-center justify-center bg-warm-orange-gradient">
                    <MapPin className="h-8 w-8 text-white/90" />
                    <div className="absolute bottom-2 left-3">
                      <h3 className="font-semibold text-white">{market.name}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Navigation className="h-3 w-3" /> {market.distanceKm} km · {market.city}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {market.rating}
                      </span>
                      <Badge className={isMarketOpenNow(market) ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                        {isMarketOpenNow(market) ? 'Open now' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top riders + errand pros */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-navy dark:text-white">
          <Sparkles className="h-5 w-5 text-primary" /> Top-rated near you
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRiders.map((rider, i) => (
            <motion.div key={`r-${rider.id}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href="/nearby">
                <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                  <img src={rider.avatar} alt={rider.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-navy dark:text-white">{rider.name}</h3>
                    <p className="text-xs text-muted-foreground">{rider.vehicle} · {rider.city}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {rider.rating}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{formatCount(rider.deliveries)} deliveries</span>
                    </div>
                  </div>
                  <Badge className={rider.available ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                    {rider.available ? 'Available' : 'Busy'}
                  </Badge>
                </Card>
              </Link>
            </motion.div>
          ))}
          {topErrands.map((pro, i) => (
            <motion.div key={`e-${pro.id}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 3) * 0.05 }}>
              <Link href="/nearby">
                <Card className="flex items-center gap-3 p-4 transition-all hover:shadow-lg">
                  <img src={pro.avatar} alt={pro.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-navy dark:text-white">{pro.name}</h3>
                      <VerifiedBadge className="h-3 w-3" />
                    </div>
                    <p className="text-xs text-primary">{pro.specialty}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {pro.rating}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{formatCount(pro.tasks)} tasks</span>
                    </div>
                  </div>
                  <Badge className={pro.available ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                    {pro.available ? 'Available' : 'Busy'}
                  </Badge>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchPageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="relative mb-6">
        <div className="h-12 w-full animate-pulse rounded-full bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}
