import { Injectable } from '@angular/core';
import productosData from '../../assets/json/product-data.json';
import type { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogService {
  private readonly products: Product[];

  constructor() {
    this.products = Object.keys(productosData).map((key) => {
      const row = productosData[key as keyof typeof productosData] as Omit<Product, 'id'>;
      return { ...row, id: key };
    });
  }

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  /** Precio numérico en COP a partir del texto tipo "$ 4.299.000" */
  parsePrice(priceLabel: string): number {
    const digits = priceLabel.replace(/\D/g, '');
    const n = parseInt(digits, 10);
    return Number.isFinite(n) ? n : 0;
  }

  getCategories(): string[] {
    const set = new Set(this.products.map((p) => p.category));
    return [...set].sort((a, b) => a.localeCompare(b, 'es'));
  }
}
