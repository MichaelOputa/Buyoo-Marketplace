'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bike,
  Car,
  Truck,
  ShoppingBag,
  MapPin,
  Star,
  Phone,
  Clock,
  Navigation,
  Sparkles,
  Calendar,
  CheckCircle2,
  Circle,
  Store,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerifiedBadge } from '@/components/verified-badge';
import {
  riders,
  errandPros,
  markets,
  formatPrice,
  formatCount,
  weekdayShort,
  isMarketOpenToday,
  isMarketOpenNow,
  formatMarketDays,
} from '@/lib/data';
import { cn } from '@/lib/utils';

const vehicleIcon: Record<string, typeof Bike> = {
  Bike: Bike,
  Motorcycle: Bike,
  Car: Car,
  Van: Truck,
};

type Tab = 'markets' | 'riders' | 'errands';

export default function NearbyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('markets');
  const [query, setQuery] = useState('');

  const today = new Date();
  const todaysMarkets = useMemo(
    () => markets.filter((m) => isMarketOpenToday(m, today)),
    [today]
  );

  const filteredMarkets = markets.filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.city.toLowerCase().includes(query.toLowerCase()) ||
      m.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredRiders = riders.filter(
    (r) =>
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.city.toLowerCase().includes(query.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredErrands = errandPros.filter(
    (e) =>
      !query ||
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.specialty.toLowerCase().includes(query.toLowerCase()) ||
      e.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      e.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white">
          Near You
        </h1>
        <p className="mt-1 text-muted-foreground">
          Markets, delivery riders, and errand professionals around you
        </p>
      </div>

      {/* Market day notifications */}
      {todaysMarkets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-3"
        >
          {todaysMarkets.map((market) => {
            const openNow = isMarketOpenNow(market, today);
            return (
              <Card
                key={market.id}
                className="flex items-center gap-4 border-primary/30 bg-primary/5 p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-orange-gradient text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy dark:text-white">
                    {market.name} is active today
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {market.marketDays.length === 0
                      ? 'Open daily'
                      : `Market day · ${formatMarketDays(market)}`}{' '}
                    · {market.openTime}–{market.closeTime}
                  </p>
                </div>
                <Badge
                  className={cn(
                    'shrink-0',
                    openNow ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {openNow ? 'Open now' : 'Closed'}
                </Badge>
                <Button asChild size="sm" variant="outline" className="shrink-0">
                  <Link href={`/nearby?tab=markets`}>
                    <Navigation className="mr-1 h-3.5 w-3.5" /> Visit
                  </Link>
                </Button>
              </Card>
            );
          })}
        </motion.div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search markets, riders, errand pros, or locations..."
          className="h-12 rounded-2xl border-border/60 bg-muted/30 pl-12 text-base shadow-sm"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: 'markets' as const, label: 'Markets', icon: Store, count: filteredMarkets.length },
          { id: 'riders' as const, label: 'Delivery Riders', icon: Bike, count: filteredRiders.length },
          { id: 'errands' as const, label: 'Errand Pros', icon: ShoppingBag, count: filteredErrands.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-warm-orange-gradient text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className={cn('ml-1 rounded-full px-1.5 text-xs', activeTab === tab.id ? 'bg-white/20' : 'bg-background/60')}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Markets */}
      {activeTab === 'markets' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market, i) => {
            const openToday = isMarketOpenToday(market, today);
            const openNow = isMarketOpenNow(market, today);
            return (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {market.marketDays.length > 0 ? (
                        <Badge className="bg-warm-orange-gradient text-white">
                          <Sparkles className="mr-1 h-3 w-3" /> Market Day
                        </Badge>
                      ) : (
                        <Badge className="bg-secondary text-white">Open Daily</Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display text-lg font-bold text-white">{market.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-white/80">
                        <MapPin className="h-3 w-3" /> {market.address}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {market.rating} ({market.reviewCount})
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Navigation className="h-3.5 w-3.5" /> {market.distanceKm} km
                        </span>
                      </div>
                      <Badge
                        className={cn(openNow ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground')}
                      >
                        {openNow ? 'Open now' : openToday ? 'Opens soon' : 'Closed'}
                      </Badge>
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">{market.description}</p>

                    {/* Market days */}
                    <div className="mt-3 flex items-center gap-1.5">
                      {weekdayShort.map((day, idx) => {
                        const isMarketDay =
                          market.marketDays.length === 0 || market.marketDays.includes(idx);
                        const isToday = idx === today.getDay();
                        return (
                          <div
                            key={day}
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium',
                              isMarketDay
                                ? isToday
                                  ? 'bg-warm-orange-gradient text-white'
                                  : 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground/50'
                            )}
                          >
                            {day[0]}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {market.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="bg-secondary/10 text-secondary">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {market.openTime}–{market.closeTime} · {formatMarketDays(market)}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Riders */}
      {activeTab === 'riders' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRiders.map((rider, i) => {
            const VehicleIcon = vehicleIcon[rider.vehicle] || Bike;
            return (
              <motion.div
                key={rider.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={rider.avatar}
                        alt={rider.name}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />
                      <span
                        className={cn(
                          'absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card',
                          rider.available ? 'bg-green-500' : 'bg-muted'
                        )}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-navy dark:text-white">{rider.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {rider.city}, {rider.state}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {rider.rating}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{formatCount(rider.deliveries)} deliveries</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-xl bg-muted/50 p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <VehicleIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Vehicle</p>
                        <p className="text-sm font-medium text-navy dark:text-white">{rider.vehicle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="text-sm font-bold text-primary">{formatPrice(rider.rateFrom)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="text-sm font-medium text-navy dark:text-white">{rider.distanceKm} km</p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      className="flex-1 bg-warm-orange-gradient"
                      disabled={!rider.available}
                    >
                      {rider.available ? 'Request Pickup' : 'Unavailable'}
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Call rider">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Errand professionals */}
      {activeTab === 'errands' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredErrands.map((pro, i) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4 transition-all hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <span
                      className={cn(
                        'absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card',
                        pro.available ? 'bg-green-500' : 'bg-muted'
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-semibold text-navy dark:text-white">{pro.name}</h3>
                      <VerifiedBadge className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs font-medium text-primary">{pro.specialty}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {pro.rating}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{formatCount(pro.tasks)} tasks</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="flex items-center gap-0.5 text-muted-foreground">
                        <Navigation className="h-3 w-3" /> {pro.distanceKm} km
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pro.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/10 text-secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-sm font-bold text-primary">{formatPrice(pro.rateFrom)}</p>
                  </div>
                  <Badge className={pro.available ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}>
                    {pro.available ? 'Available now' : 'Busy'}
                  </Badge>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button className="flex-1 bg-warm-orange-gradient" disabled={!pro.available}>
                    {pro.available ? 'Hire for Errand' : 'Unavailable'}
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Call errand pro">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {((activeTab === 'markets' && filteredMarkets.length === 0) ||
        (activeTab === 'riders' && filteredRiders.length === 0) ||
        (activeTab === 'errands' && filteredErrands.length === 0)) && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-navy dark:text-white">Nothing nearby</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search or check back later.</p>
        </div>
      )}
    </div>
  );
}
