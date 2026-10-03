export type Goal = 'fat-loss' | 'muscle-building' | 'recomposition' | 'energy-mobility'
export type Experience = 'beginner' | 'intermediate' | 'advanced'
export type Bottleneck = 'time' | 'nutrition' | 'accountability'

export interface QuizSelections {
  goal: Goal
  experience: Experience
  bottleneck: Bottleneck
}

export interface Blueprint {
  calorieBaseline: number
  frequency: number
  timeline: number
}

const CALORIE_BY_GOAL: Record<Goal, number> = {
  'fat-loss': 1900,
  'muscle-building': 2600,
  recomposition: 2200,
  'energy-mobility': 2300,
}

const CALORIE_BY_EXPERIENCE: Record<Experience, number> = {
  beginner: 0,
  intermediate: 100,
  advanced: 200,
}

const FREQUENCY_BY_GOAL: Record<Goal, number> = {
  'fat-loss': 4,
  'muscle-building': 4,
  recomposition: 5,
  'energy-mobility': 3,
}

const FREQUENCY_BY_EXPERIENCE: Record<Experience, number> = {
  beginner: -1,
  intermediate: 0,
  advanced: 1,
}

const TIMELINE_BY_GOAL: Record<Goal, number> = {
  'fat-loss': 12,
  'muscle-building': 20,
  recomposition: 16,
  'energy-mobility': 8,
}

const TIMELINE_BY_EXPERIENCE: Record<Experience, number> = {
  beginner: -2,
  intermediate: 0,
  advanced: 4,
}

const TIMELINE_BY_BOTTLENECK: Record<Bottleneck, number> = {
  time: 4,
  nutrition: 2,
  accountability: 0,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function computeBlueprint({ goal, experience, bottleneck }: QuizSelections): Blueprint {
  return {
    calorieBaseline: CALORIE_BY_GOAL[goal] + CALORIE_BY_EXPERIENCE[experience],
    frequency: clamp(FREQUENCY_BY_GOAL[goal] + FREQUENCY_BY_EXPERIENCE[experience], 3, 6),
    timeline: clamp(
      TIMELINE_BY_GOAL[goal] +
        TIMELINE_BY_EXPERIENCE[experience] +
        TIMELINE_BY_BOTTLENECK[bottleneck],
      4,
      Number.POSITIVE_INFINITY,
    ),
  }
}
