import { forwardRef, type SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`
          w-full rounded-xl border bg-night-800/70 px-3.5 py-2 text-sm text-neutral-100
          focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-error-500' : 'border-neutral-700'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

// Sub-components for compound pattern
export const SelectTrigger = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <Select ref={ref} className={className} {...props}>
        {children}
      </Select>
    )
  }
)
SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  return <option value={value}>{children}</option>
}
