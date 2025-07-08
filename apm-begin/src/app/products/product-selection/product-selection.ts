import { Component, computed, effect, inject, linkedSignal, Pipe, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  private readonly productService = inject(ProductService);

  selectedProduct = signal<Product | undefined>(undefined);

  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1 // Default quantity is 1 if a product is selected, otherwise 0
  });

  
  products = this.productService.productsResource.value;
  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');
  

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity() );
  color = computed(() => this.total() > 200 ? 'green' : 'blue'); // only readable signal

  onDecrease() {
    this.quantity.update(qty => qty > 0 ? qty - 1 : 0); // Ensure quantity does not go below 1
  }

  onIncrease() {    
    this.quantity.update(qty => qty + 1);  
  }

  qtyEffect= effect(() => {
    console.log(`Quantity changed to: ${this.quantity()}`);
  })

}
