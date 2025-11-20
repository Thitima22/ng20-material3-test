import { Injectable } from '@angular/core';
import { argbFromHex, themeFromSourceColor, hexFromArgb } from "@material/material-color-utilities";
import { ratio, isAccessible } from 'get-contrast';

@Injectable({
  providedIn: 'root',
})
export class ColorContrastService {
  determineOptimalForegroundColor(backgroundColor: string): string {
    if (!backgroundColor) return '';

    const seedArgb = argbFromHex(backgroundColor);
    const materialTheme = themeFromSourceColor(seedArgb);

    const primaryPalette = materialTheme.palettes.primary;
    const neutralPalette = materialTheme.palettes.neutral;

    const onPrimary = hexFromArgb(primaryPalette.tone(100));
    const onSurface = hexFromArgb(neutralPalette.tone(10));
    // console.log('onPrimary: ', onPrimary)
    // console.log('onSurface: ', onSurface)

    return this.selectBestContrastColor(backgroundColor, onPrimary, onSurface);
  }

  selectBestContrastColor(backgroundColor: string, onPrimary: string, onSurface: string): string {
    const white = onPrimary;
    const black = onSurface;

    const contrastRatioWithWhite = ratio(backgroundColor, white);
    const contrastRatioWithBlack = ratio(backgroundColor, black);

    if (contrastRatioWithWhite >= contrastRatioWithBlack) {
      return white;
    } else {
      return black;
    }
  }

  // isWcagAALevel(backgroundColor: string, foregroundColor: string): boolean {
  //   return isAccessible(backgroundColor, foregroundColor);
  // }

  isWcagAAForNormalText(backgroundColor: string, foregroundColor: string): boolean {
    return isAccessible(backgroundColor, foregroundColor, {
      size: 'small',
      level: 'AA',
    });
  }

  isWcagAAForLargeText(backgroundColor: string, foregroundColor: string): boolean {
    return isAccessible(backgroundColor, foregroundColor, {
      size: 'large',
      level: 'AA',
    });
  }

  isWcagAAAForNormalText(backgroundColor: string, foregroundColor: string): boolean {
    return isAccessible(backgroundColor, foregroundColor, {
      size: 'small',
      level: 'AAA',
    });
  }

  isWcagAAAForLargeText(backgroundColor: string, foregroundColor: string): boolean {
    return isAccessible(backgroundColor, foregroundColor, {
      size: 'large',
      level: 'AAA',
    });
  }
}
