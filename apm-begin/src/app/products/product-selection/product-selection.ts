import { Component, effect, Pipe, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  selectedProduct = signal<Product | undefined>(undefined)
  quantity = signal(1);

  products = signal(ProductData.products);

  onDecrease() {
    this.quantity.update(qty => qty > 0 ? qty - 1 : 0); // Ensure quantity does not go below 1
  }

  onIncrease() {
    // this.quantity.set(1); // Reset to 1 before increasing
    this.quantity.update(qty => qty + 1);
  
  }

  qtyEffect= effect(() => {
    console.log(`Quantity changed to: ${this.quantity()}`);
  })
  
}
