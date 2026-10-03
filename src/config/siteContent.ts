import type { Goal, Experience, Bottleneck } from '../lib/quiz'
import type { CertIconName } from '../components/ui/CertIcon'
import type { Sex, ActivityLevel, BMICategory } from '../lib/calculators'

export interface CtaLink {
  label: string
  to: string
  icon?: string
}

export interface ImageContent {
  src: string
  alt: string
}

export interface NavLink {
  label: string
  to: string
}

export interface SiteMeta {
  logoName: string
  logoBrandline: string
}

export interface HeroContent {
  badge: string
  headline: string
  subhead: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
  trust: string
  portrait: ImageContent
  sealLabel: string
  floatingProof: { value: number; suffix: string; label: string }
}

export interface QuizOption<T extends string> {
  value: T
  label: string
  description: string
}

export interface AssessmentContent {
  badge: string
  title: string
  subtitle: string
  steps: {
    goal: { question: string; options: QuizOption<Goal>[] }
    experience: { question: string; options: QuizOption<Experience>[] }
    bottleneck: { question: string; options: QuizOption<Bottleneck>[] }
  }
  resultTitle: string
  resultLabels: { calories: string; frequency: string; timeline: string }
  resultCta: CtaLink
}

export interface Pillar {
  title: string
  description: string
}

export interface Certification {
  icon: CertIconName
  label: string
}

export interface PhilosophyContent {
  badge: string
  title: string
  intro: string
  pillars: Pillar[]
  certsTitle: string
  certifications: Certification[]
}

export type TransformationCategory = 'fat-loss' | 'executives' | 'muscle-gain'

export interface Transformation {
  id: string
  tag: string
  categories: TransformationCategory[]
  before: ImageContent
  after: ImageContent
  quote: string
}

export interface TransformationsContent {
  badge: string
  title: string
  subtitle: string
  filters: { value: TransformationCategory | 'all'; label: string }[]
  cases: Transformation[]
}

export interface PricingTier {
  id: string
  name: string
  price: string
  cadence: string
  summary: string
  features: string[]
  cta: CtaLink
  featured: boolean
  badge?: string
}

export interface ComparisonRow {
  label: string
  tiers: [boolean, boolean, boolean]
}

export interface PricingContent {
  badge: string
  title: string
  subtitle: string
  tiers: PricingTier[]
  comparison: { title: string; columns: string[]; rows: ComparisonRow[] }
}

export interface BookingField {
  id: string
  label: string
  type: 'select' | 'date' | 'text' | 'email'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface BookingContent {
  badge: string
  title: string
  subtitle: string
  fields: BookingField[]
  submitLabel: string
  successTitle: string
  successMessage: string
  calendlyUrl: string
  timezoneNote: string
}

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export interface FooterContent {
  callout: { title: string; subtitle: string; cta: CtaLink }
  socials: SocialLink[]
  copyright: string
}

export interface VideoContent {
  badge: string
  title: string
  subtitle: string
  poster: ImageContent
  embedUrl: string
  playLabel: string
  durationLabel: string
}

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

export interface ActivityOption {
  value: ActivityLevel
  label: string
  description: string
}

export interface BMICategoryContent {
  label: string
  range: string
}

export interface ToolsContent {
  disclaimer: string
  emptyHint: string
  units: SegmentOption<'metric' | 'imperial'>[]
  unitSuffix: { kg: string; lb: string; cm: string; ft: string; in: string }
  fields: { weight: string; height: string; age: string; sex: string; activity: string }
  ageSuffix: string
  sexOptions: SegmentOption<Sex>[]
  activityOptions: ActivityOption[]
  energyUnit: string
  bmi: {
    title: string
    subtitle: string
    resultLabel: string
    categories: Record<BMICategory, BMICategoryContent>
  }
  page: { badge: string; title: string; subtitle: string }
  bmr: { title: string; subtitle: string; resultLabel: string }
  tdee: { title: string; subtitle: string; resultLabel: string; bmrLabel: string }
}

export interface SiteContent {
  meta: SiteMeta
  nav: NavLink[]
  navCta: CtaLink
  hero: HeroContent
  video: VideoContent
  assessment: AssessmentContent
  philosophy: PhilosophyContent
  transformations: TransformationsContent
  pricing: PricingContent
  booking: BookingContent
  tools: ToolsContent
  footer: FooterContent
}

export const siteContent: SiteContent = {
  meta: {
    logoName: 'Alex Rivera',
    logoBrandline: 'Elite Performance',
  },
  nav: [
    { label: 'My Philosophy', to: '/philosophy' },
    { label: 'Transformations', to: '/transformations' },
    { label: 'Coaching Tiers', to: '/coaching' },
    { label: 'Free Tools', to: '/tools' },
  ],
  navCta: { label: 'Apply for Coaching', to: '/apply', icon: '→' },
  hero: {
    badge: '1-on-1 Online & Hybrid Performance Coaching',
    headline: 'Stop Guessing in the Gym. Get a Blueprint Built Around Your Schedule.',
    subhead:
      'I help busy executives and professionals rebuild their energy, lose 15–30 lbs, and sustain peak condition — without restrictive diets or living in the gym.',
    primaryCta: { label: 'Apply for Coaching', to: '/apply', icon: '→' },
    secondaryCta: { label: 'Take 60-Sec Fitness Quiz', to: '#assessment', icon: '↗' },
    trust: '★ 4.9/5 across 180+ verified client transformations',
    portrait: {
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80',
      alt: 'Coach Alex Rivera in a training session',
    },
    sealLabel: 'Certified Trainer',
    floatingProof: { value: 180, suffix: '+', label: 'lives transformed' },
  },
  video: {
    badge: 'Inside the Method',
    title: 'See How the Coaching Actually Works',
    subtitle:
      'A short look at how I build your plan, run weekly check-ins, and adjust it around your real schedule.',
    poster: {
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1280&q=80',
      alt: 'Coach Alex Rivera working through a plan with a client in the gym',
    },
    // Placeholder video — swap for Alex's real coaching overview (YouTube/Vimeo /embed/ URL).
    embedUrl: 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ',
    playLabel: 'Play the coaching overview video',
    durationLabel: '2:14',
  },
  assessment: {
    badge: '60-Second Assessment',
    title: 'Find Your Starting Blueprint',
    subtitle: 'Answer three questions to estimate your targets and realistic timeline.',
    steps: {
      goal: {
        question: 'What is your primary goal?',
        options: [
          { value: 'fat-loss', label: 'Fat Loss', description: 'Drop body fat and lean out' },
          { value: 'muscle-building', label: 'Muscle Building', description: 'Add lean size and strength' },
          { value: 'recomposition', label: 'Recomposition', description: 'Lose fat and build muscle at once' },
          { value: 'energy-mobility', label: 'Energy & Mobility', description: 'Feel strong, mobile, and energized' },
        ],
      },
      experience: {
        question: 'What is your current experience level?',
        options: [
          { value: 'beginner', label: 'Beginner', description: 'New or returning after a long break' },
          { value: 'intermediate', label: 'Intermediate', description: 'Consistent for 6+ months' },
          { value: 'advanced', label: 'Advanced / Stalled', description: 'Trained for years but plateaued' },
        ],
      },
      bottleneck: {
        question: 'What is your biggest bottleneck?',
        options: [
          { value: 'time', label: 'Time / Schedule', description: 'Long hours and travel' },
          { value: 'nutrition', label: 'Nutrition / Consistency', description: 'Eating derails the plan' },
          { value: 'accountability', label: 'Accountability', description: 'I start strong, then fade' },
        ],
      },
    },
    resultTitle: 'Your Estimated Blueprint',
    resultLabels: {
      calories: 'kcal daily baseline',
      frequency: 'sessions / week',
      timeline: 'weeks to visible results',
    },
    resultCta: { label: 'Lock In My Custom Blueprint', to: '/apply', icon: '→' },
  },
  philosophy: {
    badge: 'My Philosophy',
    title: 'Coaching Built on Systems, Not Willpower',
    intro:
      'Sustainable results come from data, flexibility, and real accountability — not punishment. Every plan is engineered around your life, then adjusted weekly.',
    pillars: [
      {
        title: 'Data-Driven Recomposition',
        description: 'Custom macro targets and progressive overload — no cookie-cutter templates, ever.',
      },
      {
        title: 'Lifestyle-First Nutrition',
        description: 'Flexible eating systems designed for dining out, travel, and real schedules.',
      },
      {
        title: '1-on-1 Direct Accountability',
        description: 'Weekly 15-minute video check-ins and direct messaging access between sessions.',
      },
    ],
    certsTitle: 'Verified Credentials',
    certifications: [
      { icon: 'strength', label: 'NSCA-CSCS' },
      { icon: 'nutrition', label: 'Precision Nutrition L2' },
      { icon: 'kinesiology', label: 'B.Sc. Kinesiology' },
    ],
  },
  transformations: {
    badge: 'Verified Results',
    title: 'Real Clients, Real Transformations',
    subtitle: 'Filter by starting point to see proof this works for someone like you.',
    filters: [
      { value: 'all', label: 'All' },
      { value: 'fat-loss', label: 'Fat Loss' },
      { value: 'executives', label: 'Executives 35+' },
      { value: 'muscle-gain', label: 'Muscle Gain' },
    ],
    cases: [
      {
        id: 'marcus',
        tag: 'Executive, Age 42 • Lost 24 lbs in 12 Wks',
        categories: ['fat-loss', 'executives'],
        before: {
          src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
          alt: 'Marcus before coaching',
        },
        after: {
          src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
          alt: 'Marcus after coaching',
        },
        quote:
          'I travel three weeks a month and still hit my targets. Alex built the plan around my calendar, not the other way around.',
      },
      {
        id: 'priya',
        tag: 'Founder, Age 36 • Down 2 Dress Sizes',
        categories: ['fat-loss', 'executives'],
        before: {
          src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
          alt: 'Priya before coaching',
        },
        after: {
          src: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80',
          alt: 'Priya after coaching',
        },
        quote:
          'The weekly check-ins kept me honest. For the first time a plan actually survived a product launch and the holidays.',
      },
      {
        id: 'david',
        tag: 'Engineer, Age 29 • +14 lbs Lean Mass',
        categories: ['muscle-gain'],
        before: {
          src: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&q=80',
          alt: 'David before coaching',
        },
        after: {
          src: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
          alt: 'David after coaching',
        },
        quote:
          'I finally broke a two-year plateau. Progressive overload plus real macro targets changed everything.',
      },
    ],
  },
  pricing: {
    badge: 'Coaching Tiers',
    title: 'Choose Your Level of Accountability',
    subtitle: 'Transparent tiers so you can match the program to your budget before we talk.',
    tiers: [
      {
        id: 'self-paced',
        name: 'Self-Paced Blueprint',
        price: '$149',
        cadence: '/month',
        summary: 'Your plan and targets, delivered monthly to run on your own.',
        features: ['Custom workout plan', 'Macro targets', 'Monthly plan refresh', 'Exercise video library'],
        cta: { label: 'Apply', to: '/apply' },
        featured: false,
      },
      {
        id: 'hybrid',
        name: '1-on-1 Hybrid Coaching',
        price: '$399',
        cadence: '/month',
        summary: 'Custom programming with weekly accountability and direct access.',
        features: [
          'Everything in Self-Paced',
          'Weekly 15-min video check-ins',
          'Direct messaging access',
          'Biweekly program adjustments',
        ],
        cta: { label: 'Apply', to: '/apply', icon: '→' },
        featured: true,
        badge: 'Most Popular',
      },
      {
        id: 'vip',
        name: 'VIP Concierge',
        price: '$899',
        cadence: '/month',
        summary: 'White-glove coaching with daily access and travel adjustments.',
        features: [
          'Everything in Hybrid',
          '24/7 direct access',
          'Daily nutrition audits',
          'Travel workout adjustments',
        ],
        cta: { label: 'Apply', to: '/apply' },
        featured: false,
      },
    ],
    comparison: {
      title: 'Compare Every Tier',
      columns: ['Self-Paced', 'Hybrid', 'VIP'],
      rows: [
        { label: 'Custom workout plan', tiers: [true, true, true] },
        { label: 'Macro targets', tiers: [true, true, true] },
        { label: 'Weekly video check-ins', tiers: [false, true, true] },
        { label: 'Direct messaging access', tiers: [false, true, true] },
        { label: '24/7 direct access', tiers: [false, false, true] },
        { label: 'Daily nutrition audits', tiers: [false, false, true] },
      ],
    },
  },
  booking: {
    badge: 'Apply & Book',
    title: 'Book Your 15-Minute Strategy Call',
    subtitle: 'A few quick questions help me prepare before we talk.',
    fields: [
      { id: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'Jordan Blake' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
      {
        id: 'budget',
        label: 'Budget readiness',
        type: 'select',
        required: true,
        options: ['Under $150/mo', '$150–$400/mo', '$400–$900/mo', '$900+/mo'],
      },
      { id: 'startDate', label: 'Target start date', type: 'date', required: true },
      {
        id: 'commitment',
        label: 'Commitment level',
        type: 'select',
        required: true,
        options: ['Exploring options', 'Ready in 30 days', 'Ready to start now'],
      },
    ],
    submitLabel: 'Request My Call',
    successTitle: "You're in — check your inbox.",
    successMessage: 'I review every application personally and will confirm your strategy call within one business day.',
    calendlyUrl: '',
    timezoneNote: 'Times are shown in your local timezone, detected automatically.',
  },
  tools: {
    disclaimer:
      'Estimates for general guidance only — not medical advice. Your coaching plan uses precise, individualized targets.',
    emptyHint: 'Fill in the fields to see your result.',
    units: [
      { value: 'metric', label: 'Metric' },
      { value: 'imperial', label: 'Imperial' },
    ],
    unitSuffix: { kg: 'kg', lb: 'lb', cm: 'cm', ft: 'ft', in: 'in' },
    fields: { weight: 'Weight', height: 'Height', age: 'Age', sex: 'Sex', activity: 'Activity level' },
    ageSuffix: 'years',
    sexOptions: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    activityOptions: [
      { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise, desk job' },
      { value: 'light', label: 'Lightly active', description: 'Light exercise 1–3 days / week' },
      { value: 'moderate', label: 'Moderately active', description: 'Moderate exercise 3–5 days / week' },
      { value: 'active', label: 'Very active', description: 'Hard exercise 6–7 days / week' },
      { value: 'very-active', label: 'Athlete', description: 'Hard daily exercise + physical job' },
    ],
    energyUnit: 'kcal / day',
    bmi: {
      title: 'BMI Calculator',
      subtitle: 'Body Mass Index from your height and weight.',
      resultLabel: 'Your BMI',
      categories: {
        underweight: { label: 'Underweight', range: 'Below 18.5' },
        normal: { label: 'Healthy', range: '18.5 – 24.9' },
        overweight: { label: 'Overweight', range: '25.0 – 29.9' },
        obese: { label: 'Obese', range: '30.0 and above' },
      },
    },
    page: {
      badge: 'Free Tools',
      title: 'Fitness Calculators',
      subtitle: 'Estimate your metabolism and daily calorie needs to plan your next phase.',
    },
    bmr: {
      title: 'BMR Calculator',
      subtitle: 'Your Basal Metabolic Rate — the energy your body burns at complete rest.',
      resultLabel: 'Your BMR',
    },
    tdee: {
      title: 'TDEE Calculator',
      subtitle: 'Your Total Daily Energy Expenditure — maintenance calories for your activity.',
      resultLabel: 'Your TDEE',
      bmrLabel: 'Based on a BMR of',
    },
  },
  footer: {
    callout: {
      title: "Find Out If We're a Good Fit",
      subtitle: 'Take the 60-second assessment or apply for a strategy call.',
      cta: { label: 'Apply for Coaching', to: '/apply', icon: '→' },
    },
    socials: [
      { label: 'Instagram', href: 'https://instagram.com', handle: '@coachalexrivera' },
      { label: 'YouTube', href: 'https://youtube.com', handle: '@alexriveraperformance' },
      { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'in/alexrivera' },
    ],
    copyright: '© 2026 Alex Rivera Performance. All rights reserved.',
  },
}
