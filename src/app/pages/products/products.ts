import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import productosData from '../../../assets/json/product-data.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements OnInit {
  listProducts: any[] = [];

  ngOnInit(): void {
    this.listProducts = Object.keys(productosData).map(key => { // Convertimos cada producto en un objeto con su ID incluido
      return {
        ...productosData[key as keyof typeof productosData],
        id: key
      };
    });
  }
}
