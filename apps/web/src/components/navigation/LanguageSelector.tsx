import { useTranslation } from 'react-i18next'
import { languages, getLanguageDir } from '@/lib/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { ChevronDownIcon, GlobeIcon } from '@/components/ui/icons'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

const flagFor = (code: string) => {
  switch (code) {
    case 'en': return '🇬🇧'
    case 'de': return '🇩🇪'
    case 'fr': return '🇫🇷'
    case 'ar': return '🇸🇦'
    case 'it': return '🇮🇹'
    default: return '🇪🇸'
  }
}

export function LanguageSelector() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = getLanguageDir(i18n.language)
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.05] px-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Select language"
        >
          <GlobeIcon className="h-4 w-4 text-primary-300" />
          <span className="hidden uppercase tracking-wide sm:inline">
            {currentLang.code}
          </span>
          <ChevronDownIcon className="h-3.5 w-3.5 text-neutral-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code)
              document.documentElement.dir = lang.dir
              document.documentElement.lang = lang.code
            }}
            className={cn(
              'flex items-center gap-2 text-neutral-300',
              i18n.language === lang.code && 'text-white'
            )}
          >
            <span className="text-base leading-none">{flagFor(lang.code)}</span>
            <span className="flex-1">{lang.name}</span>
            {i18n.language === lang.code && (
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary-400 to-turquoise-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
