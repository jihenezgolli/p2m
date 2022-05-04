import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories.model';
import { Products } from 'src/app/models/products.model';
import { Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-u-i',
  templateUrl: './u-i.component.html',
  styleUrls: ['./u-i.component.css']
})
export class UIComponent implements OnInit, OnDestroy {

  categories: Categories[];
  items: Products[] = JSON.parse(sessionStorage.getItem('sessionCartItems')) || [];
  sessionUserData: Users = JSON.parse(sessionStorage.getItem('sessionUserData'));
  subscription: Subscription;
  accountSub: Subscription;

  constructor(private categoriesServ: CategoriesService, private usersServ: UsersService, private cartServ: CartService) { }

  ngOnInit() {
    this.accountSub = this.usersServ.accountChanged.subscribe(
      (sessionUserData: Users) => {
        this.sessionUserData = sessionUserData;
      }
    );
    this.subscription = this.cartServ.itemsChanged.subscribe(
      (items: Products[]) => {
        this.items = items;
      }
    );
    this.loadCategories();
  }

  private loadCategories(){
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
      }
    );
  }

  logout() {
    this.usersServ.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.accountSub.unsubscribe();
  }

}
