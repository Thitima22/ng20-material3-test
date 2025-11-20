import { Component, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { themeFromSourceColor, hexFromArgb, argbFromHex } from '@material/material-color-utilities';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  onPrimarySignal: WritableSignal<string> = signal<string>('');
  onSurfaceSignal: WritableSignal<string> = signal<string>('');

  constructor() {
    const seedColor = '#feb9cf';

    const seedArgb = argbFromHex(seedColor);
    const materialTheme = themeFromSourceColor(seedArgb);

    const primaryPalette = materialTheme.palettes.primary;
    const neutralPalette = materialTheme.palettes.neutral;

    const onPrimary = hexFromArgb(primaryPalette.tone(100));
    // console.log('onPrimary: ', onPrimary)
    this.onPrimarySignal.set(onPrimary);
    
    const onSurface = hexFromArgb(neutralPalette.tone(10));
    // console.log('onSurface: ', onSurface)
    this.onSurfaceSignal.set(onSurface);
  }
}
