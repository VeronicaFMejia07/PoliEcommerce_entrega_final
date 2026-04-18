import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [],
  templateUrl: './products-detail.html',
  styleUrls: ['./products-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetail implements OnInit {
  productId: string | null = null;
  platform: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtenemos los valores de la URL
    this.productId = this.route.snapshot.paramMap.get('id');
    this.platform = this.route.snapshot.paramMap.get('p');

    console.log('ID:', this.productId);
  }
}
