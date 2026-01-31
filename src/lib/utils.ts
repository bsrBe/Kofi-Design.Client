
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Common color palette from designs
 */
export const DESIGN_TOKENS = {
  colors: {
    primary: '#ea2a33',
    backgroundLight: '#f8f6f6',
    backgroundDark: '#121212',
    accentGold: '#D4AF37',
    charcoal: '#1c1c1c',
  }
};
