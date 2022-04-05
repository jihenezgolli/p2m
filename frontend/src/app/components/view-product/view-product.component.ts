import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/models/products.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  products: Products[] = [];
  displayedColumns: string[] = ['image', 'id', 'name', 'category', 'price', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<Products>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private productsServ: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.productsServ.productsChanged.subscribe(
      (products: Products[]) => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.loadProducts();
  }

  private loadProducts() {
    this.productsServ.getAllProducts().subscribe(
      res => {
        this.products = res['products'];
        this.productsServ.setProducts(this.products);
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id, index) {
    var flag = confirm("Do you want to delete?");
    if (flag){
      this.productsServ.delete(id, index);
    }
  }

  openDialog(id, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {id: id};
    const dialogRef = this.dialog.open(EditProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.productsServ.edit(data, id, index);
          }
        }
    );   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}