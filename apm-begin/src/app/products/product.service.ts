import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productsUrl = 'api/products';

  productsResource = httpResource<Product[] >(() => this.productsUrl, { defaultValue: [] });

  createProducts(){
    return httpResource<Product[]>(() => this.productsUrl, { defaultValue:[]});
  }
}
