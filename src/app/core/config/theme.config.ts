/**
 * Green Innovation Color Palette & Theme Tokens
 *
 * Strict theme rules:
 * - Base: Clean, high-contrast, and light
 * - No dark bluish or greenish backgrounds
 */
export interface ThemeTokens {
  /** Primary Brand Green: Used for primary buttons, active states, key icons, and highlights */
  primaryBrandGreen: string;
  /** Primary Brand Purple: Used for headings, secondary accents, and interactive focus states */
  primaryBrandPurple: string;
  /** Background / Canvas: Clean white for main page background and primary card surfaces */
  backgroundCanvas: string;
  /** Text Primary: Deep slate charcoal for readable body copy and headings */
  textPrimary: string;
  /** Accent Tint: Soft mint green for badge backgrounds, light tags, and subtle pill fills */
  accentTint: string;
  /** Neutral Surface: Ultra-light grey for section alternating backgrounds and input fills */
  neutralSurface: string;
  /** Border / Line: Subtle borders for cards, inputs, and dividers */
  borderLine: string;
}

export const GREEN_INNOVATION_THEME: ThemeTokens = {
  primaryBrandGreen: '#10B981',
  primaryBrandPurple: '#6D28D9',
  backgroundCanvas: '#FFFFFF',
  textPrimary: '#1E293B',
  accentTint: '#A7F3D0',
  neutralSurface: '#F8FAFC',
  borderLine: '#E2E8F0',
};

export const THEME_CONFIG = {
  ...GREEN_INNOVATION_THEME,
  // Theme aliases and derivatives mapped to components
  primaryGreen: '#10B981',
  primaryGreenDark: '#059669',
  primaryGreenLight: '#A7F3D0',
  primaryPurple: '#6D28D9',
  primaryPurpleDark: '#5B21B6',
  primaryPurpleLight: '#EDE9FE',
  dark: '#1E293B',
  darkText: '#1E293B',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  white: '#FFFFFF',
  background: '#FFFFFF',
  backgroundSoft: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
} as const;

export type ThemeTokenKey = keyof typeof THEME_CONFIG;

/**
 * Google Design System Typography Stack Configuration
 */
export interface TypographyTokens {
  fontHeading: string;
  fontBody: string;
  letterSpacingHeading: string;
  lineHeightBody: string;
  headingWeights: {
    semibold: number;
    bold: number;
    extrabold: number;
  };
  bodyWeights: {
    regular: number;
    medium: number;
  };
}

export const TYPOGRAPHY_CONFIG: TypographyTokens = {
  fontHeading: '"Google Sans", "Product Sans", "Plus Jakarta Sans", "Roboto", -apple-system, sans-serif',
  fontBody: '"Google Sans Text", "Plus Jakarta Sans", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  letterSpacingHeading: '-0.02em',
  lineHeightBody: '1.6',
  headingWeights: {
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  bodyWeights: {
    regular: 400,
    medium: 500,
  },
};

