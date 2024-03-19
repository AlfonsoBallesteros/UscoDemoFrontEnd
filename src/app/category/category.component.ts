import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-category',
  standalone: true,
    imports: [
      HttpClientModule,
      NgForOf
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/api/category').subscribe((data: any) => {
      this.categories = data;
    });
  }
}
