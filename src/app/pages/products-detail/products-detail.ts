import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-detail.html',
  styleUrls: ['./products-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(ProductCatalogService);
  readonly favorites = inject(FavoritesService);

  readonly productId = toSignal(
    this.route.paramMap.pipe(map((pm) => pm.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  readonly product = computed(() => {
    const id = this.productId();
    return id ? this.catalog.getById(id) : undefined;
  });

  toggleFavorite(): void {
    const id = this.productId();
    if (id) {
      this.favorites.toggle(id);
    }
  }
}
