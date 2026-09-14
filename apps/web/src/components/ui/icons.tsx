import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function createIcon(paths: React.ReactNode, viewBox = '24 24') {
  return function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    )
  }
}

const I = createIcon

export const SparkleIcon = I(
  <>
    <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
    <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
  </>
)

export const BoltIcon = I(
  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" stroke="none" />
)

export const GlobeIcon = I(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.7 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.7-3.7-9S9.5 5.6 12 3z" />
  </>
)

export const SearchIcon = I(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </>
)

export const UserIcon = I(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c.8-3.6 4-6 8-6s7.2 2.4 8 6" />
  </>
)

export const BriefcaseIcon = I(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18" />
  </>
)

export const TargetIcon = I(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </>
)

export const LayersIcon = I(
  <>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </>
)

export const WandIcon = I(
  <>
    <path d="M15 4V2M15 10V8M11 6h2M17 6h2" />
    <path d="M4 20L16 8" />
  </>
)

export const ArrowRightIcon = I(
  <>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </>
)

export const ArrowUpRightIcon = I(
  <>
    <path d="M7 17L17 7M8 7h9v9" />
  </>
)

export const CheckIcon = I(
  <path d="M4 12.5l5.5 5.5L20 6.5" />
)

export const ChevronDownIcon = I(
  <path d="M6 9l6 6 6-6" />
)

export const Globe2Icon = I(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
  </>
)

export const MenuIcon = I(
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </>
)

export const CloseIcon = I(
  <>
    <path d="M6 6l12 12M18 6L6 18" />
  </>
)

export const RefreshIcon = I(
  <>
    <path d="M21 12a9 9 0 11-2.6-6.4" />
    <path d="M21 3v5h-5" />
  </>
)

export const StarIcon = I(
  <path
    d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z"
    fill="currentColor"
    stroke="none"
  />
)