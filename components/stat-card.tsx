'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export function StatCard({
  label,
  value,
  change,
  trend = 'up',
  icon: Icon,
  color = 'bg-primary/10 text-primary',
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', color)}>
            <Icon className="h-5 w-5" />
          </div>
          {change && (
            <span
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend === 'up' ? 'text-secondary' : 'text-destructive'
              )}
            >
              {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-navy dark:text-white">
            {value}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
