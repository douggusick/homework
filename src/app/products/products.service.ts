import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private products: Product[] = [];
    private productsUpdated = new Subject<Product[]>();

    constructor(private http: HttpClient) { }

    getProducts() {
        this.http.get<{ message: string, products: any }>('http://localhost:3000/api/products')
            .pipe(map((productData) => {
                return productData.products.map(product => {
                    return {
                        productId: product.product_id,
                        productName: product.product_name,
                        productImage: product.product_image,
                        productDescription: product.product_description
                    };
                });
            }))
            .subscribe(transformedProducts => {
                this.products = transformedProducts;
                this.productsUpdated.next([...this.products]);
            });
    }

    getProductUpdateListener() {
        return this.productsUpdated.asObservable();
    }
}

