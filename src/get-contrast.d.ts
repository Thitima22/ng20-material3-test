declare module 'get-contrast' {
  /**
   * Calculates the contrast ratio between two colors.
   * @param color1 - The first color (e.g., '#FFFFFF', 'rgb(255,255,255)').
   * @param color2 - The second color.
   * @returns The contrast ratio (e.g., 4.5).
   */
  export function ratio(color1: string, color2: string): number;

  /**
   * Determines the WCAG score (e.g., 'AAA', 'AA', 'F').
   */
  export function score(color1: string, color2: string, options?: { large: boolean }): 'AAA' | 'AA' | 'A' | 'F';

  /**
   * Checks if the contrast is accessible, according to WCAG standards.
   */
  export function isAccessible(color1: string, color2: string, options?: {
    size: 'large' | 'small',
    level: 'AA' | 'AAA'
  }): boolean;
}