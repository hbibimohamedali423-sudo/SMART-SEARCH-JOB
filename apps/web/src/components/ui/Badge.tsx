import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-primary-400/25 bg-primary-400/10 text-primary-300',
        secondary: 'border border-white/[0.12] bg-white/[0.06] text-neutral-300',
        success: 'border border-success-400/25 bg-success-400/10 text-success-300',
        warning: 'border border-warning-400/25 bg-warning-400/10 text-warning-300',
        error: 'border border-error-400/25 bg-error-400/10 text-error-300',
        outline: 'border border-primary-400/30 bg-transparent text-primary-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
