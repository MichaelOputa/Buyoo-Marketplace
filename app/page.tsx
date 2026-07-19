'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
  Store,
  Users,
  Shield,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/animated-background';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { categories, products, vendors, formatPrice, formatCount, markets, isMarketOpenToday } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] overflow-hidden pt-16">
        <AnimatedBackground />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-6 gap-1.5 border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
              <Sparkles className="h-3.5 w-3.5" />
              Your local marketplace, reimagined
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy dark:text-white md:text-6xl lg:text-7xl">
              Everything <span className="text-gradient">Around You</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Buy, sell, advertise, and discover products and services from
              vendors, brokers, and local businesses near you.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 w-full max-w-2xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, vendors or services near you..."
                  className="h-14 rounded-2xl border-border/60 bg-white/80 pl-12 text-base shadow-lg backdrop-blur-sm dark:bg-card/80"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 rounded-2xl bg-warm-orange-gradient px-8 text-base shadow-lg"
              >
                Search
              </Button>
            </div>
          </motion.form>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild variant="default" size="lg" className="rounded-full bg-warm-orange-gradient">
              <Link href="/marketplace">
                Browse Marketplace <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/auth/signup">
                <Store className="mr-1.5 h-4 w-4" /> Become a Vendor
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              { label: 'Active Vendors', value: '12K+', icon: Store },
              { label: 'Happy Customers', value: '450K+', icon: Users },
              { label: 'Products Listed', value: '89K+', icon: TrendingUp },
              { label: 'Cities Covered', value: '36', icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-2xl font-bold text-navy dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeader title="Popular Categories" subtitle="Explore what's trending" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/marketplace?category=${cat.name}`}>
                <Card className="group flex items-center gap-4 p-4 transition-all hover:shadow-lg hover:border-primary/30">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
                    <CategoryIcon name={cat.icon} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} listings</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Ads */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            title="Featured Advertisements"
            subtitle="Sponsored by top vendors"
            action={{ label: 'Advertise with us', href: '/advertise' }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {products.filter((p) => p.sponsored).map((product, i) => {
              const vendor = vendors.find((v) => v.id === product.vendorId);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/marketplace/${product.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-xl">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute left-3 top-3 bg-warm-orange-gradient text-white">
                          Sponsored
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={vendor?.avatar}
                            alt={vendor?.name}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-navy dark:text-white">
                            {vendor?.name}
                          </span>
                          {vendor?.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                        </div>
                        <h3 className="mt-2 font-semibold text-navy dark:text-white">
                          {product.title}
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" /> {product.city}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeader
          title="Trending Products"
          subtitle="What everyone's buying right now"
          action={{ label: 'View all', href: '/marketplace' }}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {products.slice(0, 6).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/marketplace/${product.id}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.trending && (
                      <Badge className="absolute right-2 top-2 bg-secondary text-white">
                        <TrendingUp className="mr-1 h-3 w-3" /> Hot
                      </Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-sm font-medium text-navy dark:text-white">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {formatPrice(product.price, product.currency)}
                    </p>
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

      {/* Nearby Businesses */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            title="Nearby Businesses"
            subtitle="Discover vendors around you"
            action={{ label: 'View all', href: '/vendors' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.slice(0, 6).map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/vendors/${vendor.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-xl">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={vendor.cover}
                        alt={vendor.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="-mt-12 mb-3 flex items-end gap-3">
                        <img
                          src={vendor.avatar}
                          alt={vendor.name}
                          className="h-16 w-16 rounded-2xl border-4 border-card object-cover"
                        />
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
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {vendor.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            {vendor.rating}
                          </span>
                          <span className="text-muted-foreground">
                            {formatCount(vendor.followers)} followers
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                          {vendor.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeader title="How Buyoo Works" subtitle="Three ways to be part of the marketplace" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Store,
              title: 'For Vendors',
              description: 'List your products, manage orders, run ads, and grow your business with powerful analytics.',
              color: 'bg-primary/10 text-primary',
              href: '/auth/signup',
              cta: 'Start Selling',
            },
            {
              icon: Users,
              title: 'For Brokers',
              description: 'Connect buyers with sellers, track commissions, and manage your client network.',
              color: 'bg-secondary/10 text-secondary',
              href: '/auth/signup',
              cta: 'Become a Broker',
            },
            {
              icon: Shield,
              title: 'For Customers',
              description: 'Discover products, chat with vendors, save favorites, and buy with confidence.',
              color: 'bg-blue-500/10 text-blue-600',
              href: '/auth/signup',
              cta: 'Get Started',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-6 transition-all hover:shadow-lg">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary/80">
                  <Link href={item.href}>
                    {item.cta} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nearby hub */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            title="Near You"
            subtitle="Markets, riders, and errand pros around you"
            action={{ label: 'Explore nearby', href: '/nearby' }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: 'Markets Near Me',
                description: 'Connect to physical markets around you with GPS. See market days, hours, and what they sell.',
                color: 'bg-primary/10 text-primary',
                href: '/nearby?tab=markets',
                cta: 'Find markets',
              },
              {
                icon: Zap,
                title: 'Nearby Delivery Riders',
                description: 'Quickly find delivery personnel around you for pickups and deliveries, by bike, car, or van.',
                color: 'bg-secondary/10 text-secondary',
                href: '/nearby?tab=riders',
                cta: 'Find riders',
              },
              {
                icon: Sparkles,
                title: 'Errand Professionals',
                description: 'Hire someone nearby to run errands — shopping, document delivery, bill payments, and more.',
                color: 'bg-amber-500/10 text-amber-600',
                href: '/nearby?tab=errands',
                cta: 'Hire a pro',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full p-6 transition-all hover:shadow-lg">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary/80">
                    <Link href={item.href}>
                      {item.cta} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Market day notifications preview */}
          {markets.filter((m) => isMarketOpenToday(m)).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Card className="border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-orange-gradient text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy dark:text-white">
                      Market day today
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {markets.filter((m) => isMarketOpenToday(m)).map((m) => m.name).join(', ')} {markets.filter((m) => isMarketOpenToday(m)).length === 1 ? 'is' : 'are'} active today. Visit for fresh food, clothing, electronics and more.
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="shrink-0">
                    <Link href="/nearby">View</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 pb-16 md:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy p-8 md:p-16">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative z-10 text-center">
            <Zap className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to join Buyoo?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Create your free account today and start buying, selling, or
              advertising to thousands of customers near you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-warm-orange-gradient">
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-navy dark:text-white md:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, any> = {
    Smartphone: Search,
    Shirt: Store,
    Car: Zap,
    Sprout: Star,
    UtensilsCrossed: Users,
    Home: Shield,
    HeartPulse: MapPin,
    Wrench: Sparkles,
  };
  const Icon = icons[name] || Search;
  return <Icon className="h-6 w-6" />;
}
