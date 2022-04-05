import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/products.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  id: number;
  title: string;
  products: Products[];
  productsWithSameCategory: Products[] = [];

  constructor(private route: ActivatedRoute, private productsServ: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.title = params['title'];
        this.loadProducts();
      }
    );
  }

  private loadProducts() {
    this.productsServ.getAllProducts().subscribe(
      res => {
        this.products = res['products'];
        this.productsWithSameCategory = [];
        for(let i=0; i<this.products.length; i++) {
          if(this.products[i].categoryId == this.id) {
            this.productsWithSameCategory.push(this.products[i]);
          }
        }
      }
    );
  }

}
