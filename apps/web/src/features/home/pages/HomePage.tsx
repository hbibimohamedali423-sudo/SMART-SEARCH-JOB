import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/feedback/Reveal'
import {
  ArrowRightIcon,
  BoltIcon,
  BriefcaseIcon,
  GlobeIcon,
  LayersIcon,
  SparkleIcon,
  TargetIcon,
  UserIcon,
  WandIcon,
} from '@/components/ui/icons'

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-16 max-w-3xl lg:mt-0" aria-hidden="true">
      {/* Backdrop glow */}
      <div className="absolute inset-0 -z-10 translate-y-8 scale-90 animate-pulse-glow rounded-[2.5rem] bg-gradient-to-br from-primary-400/20 via-turquoise-400/10 to-accent-500/20 blur-3xl" />

      {/* Main mock card */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-5 shadow-hard sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
              Match Preview
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-white">
              Senior Frontend Engineer
            </p>
          </div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-400/40">
            <span className="font-display text-2xl font-bold text-gradient">92%</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-turquoise-500">
              <SparkleIcon className="h-3 w-3 text-night-950" />
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <BriefcaseIcon className="h-4 w-4 text-turquoise-400" />
            <span>TechNova · Berlin, Germany</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <TargetIcon className="h-4 w-4 text-accent-400" />
            <span>React · TypeScript · AI</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-primary-400/20 bg-primary-400/[0.07] px-2.5 py-1 text-xs font-medium text-primary-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
          <div className="flex -space-x-2">
            {['from-primary-400 to-turquoise-500', 'from-accent-400 to-primary-500', 'from-turquoise-400 to-accent-400'].map((g, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-night-800 bg-gradient-to-br ${g}`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500">Matched in 0.4s</span>
        </div>
      </div>

      {/* Floating mini cards */}
      <div className="glass absolute -left-4 top-10 hidden animate-float rounded-2xl px-4 py-3 shadow-medium sm:block" style={{ animationDelay: '-2s' }}>
        <div className="flex items-center gap-2 text-sm text-neutral-200">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-turquoise-500">
            <UserIcon className="h-4 w-4 text-night-950" />
          </span>
          <div>
            <p className="text-xs text-neutral-400">Profile strength</p>
            <p className="font-semibold text-white">87 / 100</p>
          </div>
        </div>
      </div>

      <div className="glass absolute -right-4 bottom-8 hidden animate-float rounded-2xl px-4 py-3 shadow-medium sm:block" style={{ animationDelay: '-6s' }}>
        <div className="flex items-center gap-2 text-sm text-neutral-200">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-turquoise-400 to-accent-400">
            <GlobeIcon className="h-4 w-4 text-night-950" />
          </span>
          <div>
            <p className="text-xs text-neutral-400">Languages</p>
            <p className="font-semibold text-white">6 + RTL</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: UserIcon,
      title: t('how.steps.build.title'),
      description: t('how.steps.build.description'),
      gradient: 'from-primary-400 to-turquoise-500',
    },
    {
      icon: LayersIcon,
      title: t('how.steps.discover.title'),
      description: t('how.steps.discover.description'),
      gradient: 'from-accent-400 to-primary-500',
    },
    {
      icon: TargetIcon,
      title: t('how.steps.matched.title'),
      description: t('how.steps.matched.description'),
      gradient: 'from-turquoise-400 to-accent-400',
    },
    {
      icon: WandIcon,
      title: t('how.steps.apply.title'),
      description: t('how.steps.apply.description'),
      gradient: 'from-primary-300 to-turquoise-400',
    },
  ]

  const features = [
    {
      icon: BoltIcon,
      title: t('features.aiMatching.title'),
      description: t('features.aiMatching.description'),
    },
    {
      icon: GlobeIcon,
      title: t('features.globalJobs.title'),
      description: t('features.globalJobs.description'),
    },
    {
      icon: LayersIcon,
      title: t('features.smartApps.title'),
      description: t('features.smartApps.description'),
    },
    {
      icon: SparkleIcon,
      title: t('features.careerAssistant.title'),
      description: t('features.careerAssistant.description'),
    },
    {
      icon: BriefcaseIcon,
      title: t('features.profileAI.title'),
      description: t('features.profileAI.description'),
    },
    {
      icon: TargetIcon,
      title: t('features.privacy.title'),
      description: t('features.privacy.description'),
    },
  ]

  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="text-center lg:text-start">
              <Reveal>
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary-400" />
                  {t('hero.badge')}
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t('hero.title.prefix')}{' '}
                  <span className="text-gradient">{t('hero.title.gradient')}</span>{' '}
                  {t('hero.title.suffix')}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 lg:mx-0">
                  {t('hero.subtitle')}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <a href="#how-it-works">
                      {t('hero.ctaPrimary')}
                      <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                    <a href="#features">
                      {t('hero.ctaSecondary')}
                    </a>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
                  {[
                    { value: '6+', label: t('hero.stats.languages') },
                    { value: 'AI', label: t('hero.stats.matching') },
                    { value: 'RTL', label: t('hero.stats.rtl') },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <span className="font-display text-xl font-bold text-white">{stat.value}</span>
                      <span className="text-sm text-neutral-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={200}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="relative scroll-mt-24 py-20">
        <div className="container-page">
          <Reveal className="text-center">
            <span className="eyebrow">{t('how.eyebrow')}</span>
            <h2 className="section-title mt-5">{t('how.title')}</h2>
            <p className="section-subtitle mx-auto max-w-2xl">{t('how.subtitle')}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="group card card-hover relative h-full overflow-hidden p-6">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-glow-cyan`}
                    >
                      <step.icon className="h-6 w-6 text-night-950" />
                    </span>
                    <span className="font-display text-4xl font-bold text-white/[0.06] transition-colors group-hover:text-primary-400/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative scroll-mt-24 py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary-400/[0.06] blur-3xl" />
        <div className="container-page">
          <Reveal className="text-center">
            <span className="eyebrow">{t('features.eyebrow')}</span>
            <h2 className="section-title mt-5">{t('features.title')}</h2>
            <p className="section-subtitle mx-auto max-w-2xl">{t('features.subtitle')}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70}>
                <div className="group card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/25 hover:shadow-glow-cyan">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-400/25 bg-primary-400/[0.08] text-primary-300 transition-colors group-hover:bg-primary-400/15">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.10] bg-gradient-to-br from-night-800 via-night-900 to-night-950 px-6 py-16 text-center shadow-hard sm:px-16">
              {/* Glows */}
              <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-turquoise-400/12 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent" />

              <div className="relative">
                <span className="eyebrow">{t('cta.badge')}</span>
                <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {t('cta.title')}{' '}
                  <span className="text-gradient">{t('cta.titleAccent')}</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
                  {t('cta.subtitle')}
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="xl" className="w-full sm:w-auto" asChild>
                    <a href="#how-it-works">
                      {t('cta.primary')}
                      <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto" asChild>
                    <a href="#features">
                      {t('cta.secondary')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
