import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  private readonly catalog = inject(ProductCatalogService);
  readonly favorites = inject(FavoritesService);

  readonly categories = this.catalog.getCategories();

  readonly selectedCategory = signal<string | null>(null);
  /** Máximo en COP (rango del slider) */
  readonly maxPrice = signal(10_000_000);

  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const max = this.maxPrice();
    return this.catalog.getAll().filter((p) => {
      if (cat !== null && p.category !== cat) {
        return false;
      }
      return this.catalog.parsePrice(p.price) <= max;
    });
  });

  readonly maxPriceLabel = computed(() => this.formatCop(this.maxPrice()));

  selectCategory(cat: string | null): void {
    this.selectedCategory.set(cat);
  }

  isCategoryActive(cat: string): boolean {
    return this.selectedCategory() === cat;
  }

  onMaxPriceInput(event: Event): void {
    const v = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(v)) {
      this.maxPrice.set(v);
    }
  }

  clearFilters(): void {
    this.selectedCategory.set(null);
    this.maxPrice.set(10_000_000);
  }

  toggleFavorite(event: Event, productId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(productId);
  }

  private formatCop(value: number): string {
    return '$ ' + value.toLocaleString('es-CO');
  }
}
