import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Products } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product.service';
import { CartItems } from 'src/app/models/cartItems.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: Users[];
  categories: Categories[];
  products: Products[];
  orders: CartItems[];

  constructor(private usersServ: UsersService, private categoriesServ: CategoriesService, private productsServ: ProductService, private cartServ: CartService) { }

  ngOnInit() {
    this.loadUsers();
    this.loadCategories();
    this.loadProducts();
    this.loadOrders();
  }

  private loadUsers() {
    this.usersServ.getAllUsers().subscribe(
      res => {
        this.users = res['users'];
      }
    );
  }

  private loadCategories() {
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
      }
    );
  }

  private loadProducts() {
    this.productsServ.getAllProducts().subscribe(
      res => {
        this.products = res['products'];
      }
    );
  }

  private loadOrders() {
    this.cartServ.getAllOrders().subscribe(
      res => {
        this.orders = res['orders'];
      }
    );
  }

}
