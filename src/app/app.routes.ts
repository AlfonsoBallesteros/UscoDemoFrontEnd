import { Routes } from '@angular/router';
import {SupplierComponent} from "./supplier/supplier.component";
import {ItemComponent} from "./item/item.component";
import {CategoryComponent} from "./category/category.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: 'items', component: ItemComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'suppliers', component: SupplierComponent },
  { path: 'login', component: LoginComponent },
];
