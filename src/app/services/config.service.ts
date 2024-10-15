// src/app/config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {
    // this.setGlobalVariables();
  }

  private setGlobalVariables(): void {
    (window as any).EXCALIDRAW_ASSET_PATH = "/";
  }
}
