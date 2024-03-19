import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";

export interface Item {
  name: string;
  description: string;
  buyPrice: number;
  salePrice: number;
  stock: number;
  supplierId: number;
  categoryId: number;
}


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    HttpClientModule,
    NgForOf,
    FormsModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

  item: Item = {buyPrice: 0, categoryId: 0, description: "", name: "", salePrice: 0, stock: 0, supplierId: 0};
  items: any[] = [];
  suppliers: any[] = [];
  categories: any[] = [];
  message: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/api/items').subscribe((data: any) => {
      this.items = data;
    });
    this.http.get('http://localhost:8080/api/supplier').subscribe((data: any) => {
      this.suppliers = data;
    });
    this.http.get('http://localhost:8080/api/category').subscribe((data: any) => {
      this.categories = data;
    });
  }

  onSubmit(form: NgForm) {
    this.item.name = form.value.name;
    this.item.description = form.value.description;
    this.item.buyPrice = form.value.buyPrice;
    this.item.salePrice = form.value.salePrice;
    this.item.stock = form.value.stock;
    this.item.supplierId = form.value.supplierId;
    this.item.categoryId = form.value.categoryId;
    this.http.post('http://localhost:8080/api/item', this.item).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.message = true;
        this.ngOnInit();
      } else {
        console.log('Error al enviar datos:', data.error);
      }
    });
  }

}
