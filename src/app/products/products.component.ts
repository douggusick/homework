import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { InventoryComponent } from '../inventory/inventory.component';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productList: Product[] = [];
    private productsSub: Subscription;

    constructor(public productsService: ProductsService) { }

    ngOnInit() {
        this.productsService.getProducts();
        this.productsSub = this.productsService.getProductUpdateListener()
            .subscribe((products: Product[]) => {
                this.productList = products;
            });
    }
}