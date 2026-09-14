import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-primary-400 to-turquoise-500 text-night-950 hover:shadow-glow-cyan hover:brightness-110 focus-visible:ring-primary-400',
        destructive:
          'bg-error-600 text-white hover:bg-error-700 hover:shadow-glow-cyan focus-visible:ring-error-500',
        outline:
          'border border-primary-400/40 bg-transparent text-primary-300 hover:bg-primary-400/10 hover:shadow-glow-cyan focus-visible:ring-primary-400',
        secondary:
          'border border-white/[0.10] bg-white/[0.08] text-white hover:bg-white/[0.14] focus-visible:ring-neutral-300',
        ghost:
          'text-neutral-300 hover:bg-white/[0.06] hover:text-white focus-visible:ring-neutral-300',
        link: 'text-primary-300 underline-offset-4 hover:underline hover:text-primary-200 focus-visible:ring-primary-400',
        success:
          'bg-success-500 text-night-950 hover:bg-success-400 hover:shadow-glow-turquoise focus-visible:ring-success-500',
        warning:
          'bg-warning-500 text-night-950 hover:bg-warning-400 focus-visible:ring-warning-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
