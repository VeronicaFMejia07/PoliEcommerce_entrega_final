import { Component } from '@angular/core';
import type { Product } from './models/product';
import { FavoritesService } from './services/favorites.service';
import { ProductCatalogService } from './services/product-catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'poliecommerce';

  favoritesOpen = false;

  constructor(
    readonly favorites: FavoritesService,
    private readonly catalog: ProductCatalogService,
  ) {}

  toggleFavoritesPanel(event: Event): void {
    event.preventDefault();
    this.favoritesOpen = !this.favoritesOpen;
  }

  closeFavoritesPanel(): void {
    this.favoritesOpen = false;
  }

  favoriteItems(): Array<{ id: string; product: Product }> {
    const out: Array<{ id: string; product: Product }> = [];
    for (const id of this.favorites.ids()) {
      const product = this.catalog.getById(id);
      if (product) {
        out.push({ id, product });
      }
    }
    return out;
  }

  removeFavorite(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.remove(id);
  }
}
