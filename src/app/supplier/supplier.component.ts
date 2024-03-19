import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-supplier',
  standalone: true,
    imports: [
      HttpClientModule,
      NgForOf
    ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit{
  suppliers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/api/supplier').subscribe((data: any) => {
      this.suppliers = data;
    });
  }

}
