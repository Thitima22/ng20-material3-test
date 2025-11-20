import { Component, inject, WritableSignal, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorContrastService } from "./core/service/color-contrast-service";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private colorContrastService = inject(ColorContrastService);

  backgroundColorSignal: WritableSignal<string> = signal('');
  foregroundColorSignal: WritableSignal<string> = signal('');
  isPassesWcagSignal: WritableSignal<boolean> = signal(false);
  isShowSignal: WritableSignal<boolean> = signal(false);

  effect = effect(() => {
    if (!this.backgroundColorSignal().length) return;

    if (this.backgroundColorSignal().startsWith('#') && this.backgroundColorSignal().length === 7) {
      this.isShowSignal.set(true);

      const foregroundColor = this.colorContrastService.determineOptimalForegroundColor(this.backgroundColorSignal());
      this.foregroundColorSignal.set(foregroundColor);

      const isWcagAAForNormalText = this.colorContrastService.isWcagAAForNormalText(this.backgroundColorSignal(), this.foregroundColorSignal());
      const isWcagAAForLargeText = this.colorContrastService.isWcagAAForLargeText(this.backgroundColorSignal(), this.foregroundColorSignal());
      const isWcagAAAForNormalText = this.colorContrastService.isWcagAAAForNormalText(this.backgroundColorSignal(), this.foregroundColorSignal());
      const isWcagAAAForLargeText = this.colorContrastService.isWcagAAAForLargeText(this.backgroundColorSignal(), this.foregroundColorSignal());

      const isPassesWcag = isWcagAAForNormalText && isWcagAAForLargeText && isWcagAAAForNormalText && isWcagAAAForLargeText;
      this.isPassesWcagSignal.set(isPassesWcag);
    } else {
      this.isShowSignal.set(false);
    }
  });
}
