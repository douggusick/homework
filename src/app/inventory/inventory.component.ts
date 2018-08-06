import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Inventory } from './inventory.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']

})
export class InventoryComponent implements OnInit {
    // Gets the product ID from the ProductComponent to be passed in the API call
    @Input() productId: string;

    // Using Maps here to store the unique styles, and measurements that are coming in from
    // the API call. These will be used to generate the Column Headers (styles), Row Headers(Measurements),
    // and the counts of each 
    uniqueStyles = new Map();
    uniqueMeasurements = new Map();
    inventoryMap = new Map();

    // inventoryList gets the inventory values from the API call and stores it in this private array
    private inventoryList: Inventory[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get<{ message: string, inventory: any }>(
            'http://localhost:3000/api/inventory/' + this.productId
        )
            .pipe(map((inventoryData) => {
                return inventoryData.inventory.map(inventory => {
                    return {
                        productId: this.productId,
                        waist: inventory._id.waist,
                        length: inventory._id.length,
                        style: inventory._id.style,
                        count: inventory.count
                    }
                })
            }))
            .subscribe(transformedInventory => {
                this.inventoryList = transformedInventory;
                this.inventoryList.forEach(item => {
                    // If the style is not in the the unique styles map, put it in
                    if (!this.uniqueStyles.has(item.style)) {
                        this.uniqueStyles.set(item.style, 1);
                    }
                    // If the measurement is not in the unique measurements map, put it in
                    if (!this.uniqueMeasurements.has(item.waist + 'x' + item.length)) {
                        this.uniqueMeasurements.set(item.waist + 'x' + item.length, 1);
                    }
                    // Put the count in the inventory map with the style and measurement as the key
                    this.inventoryMap.set(item.style + item.waist + 'x' + item.length, item.count);
                });
            });

    }

    // Helper function to convert a map to an array (for iterating on the table)
    getKeys(map) {
        return Array.from(map.keys());
    }
}