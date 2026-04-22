import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'poliecommerce-favorites';

function loadIds(): string[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly _ids = signal<string[]>(loadIds());

  readonly ids = this._ids.asReadonly();

  count(): number {
    return this._ids().length;
  }

  has(productId: string): boolean {
    return this._ids().includes(productId);
  }

  toggle(productId: string): void {
    const cur = this._ids();
    const next = cur.includes(productId)
      ? cur.filter((id: string) => id !== productId)
      : [...cur, productId];
    this.persist(next);
  }

  remove(productId: string): void {
    this.persist(this._ids().filter((id: string) => id !== productId));
  }

  private persist(next: string[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    this._ids.set(next);
  }
}
