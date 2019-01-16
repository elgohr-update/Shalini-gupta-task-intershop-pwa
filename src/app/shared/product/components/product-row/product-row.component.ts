import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from 'ish-core/models/category/category.model';
import { Product } from 'ish-core/models/product/product.model';

@Component({
  selector: 'ish-product-row',
  templateUrl: './product-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  @Input()
  product: Product;
  @Input()
  category?: Category;
  @Output()
  productToBasket = new EventEmitter<void>();

  addToBasket() {
    this.productToBasket.emit();
  }
}
