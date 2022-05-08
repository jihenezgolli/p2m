import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  product: Products;
  items: Products[] = [];

  constructor(private route: ActivatedRoute, private productsServ: ProductService, private cartsServ: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.loadProduct(this.id);
      }
    );
  }

  private loadProduct(id){
    this.productsServ.getSingleProduct(id).subscribe(
      res => {
        this.product = res['product'];
      }
    );
  }

  add(){
    this.items = JSON.parse(sessionStorage.getItem('sessionCartItems')) || [];
    if(this.items.some(i => i.id === this.product.id)) {
      this.snackBar.open('Added to cart', 'Dismiss', {duration: 3000});
    } else {
      this.product.quantity = 1;
      this.items.push(this.product);
      this.cartsServ.setCart(this.items);
    }
  }

}
