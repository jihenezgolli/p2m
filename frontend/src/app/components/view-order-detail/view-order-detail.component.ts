import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CartItems } from 'src/app/models/cartItems.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditOrderDetailComponent } from '../edit-order-detail/edit-order-detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.css']
})
export class ViewOrderDetailComponent implements OnInit, OnDestroy {

  orderDetails: CartItems[] = [];
  displayedOrderDetailColumns: string[] = ['id', 'orderId', 'productId', 'quantity', 'edit', 'delete'];
  orderDetailDataSource: MatTableDataSource<CartItems>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private cartServ: CartService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.cartServ.orderDetailsChanged.subscribe(
      (orderDetails: CartItems[]) => {
        this.orderDetails = orderDetails;
        this.orderDetailDataSource = new MatTableDataSource(this.orderDetails);
        this.orderDetailDataSource.paginator = this.paginator;
        this.orderDetailDataSource.sort = this.sort;
      }
    );
    this.loadOrderDetails();
  }

  private loadOrderDetails() {
    this.cartServ.getAllOrderDetails().subscribe(
      res => {
        this.orderDetails = res['orderDetails'];
        this.cartServ.setOrderDetails(this.orderDetails);
        this.orderDetailDataSource = new MatTableDataSource(this.orderDetails);
        this.orderDetailDataSource.paginator = this.paginator;
        this.orderDetailDataSource.sort = this.sort;
      }
    );
  }

  orderDetailFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDetailDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orderDetailDataSource.paginator) {
      this.orderDetailDataSource.paginator.firstPage();
    }
  }

  deleteOrderDetail(id, index) {
    var flag = confirm("Do you want to delete?");
    if (flag){
      this.cartServ.deleteOrderDetail(id, index);
    }
  }

  openOrderDetailDialog(id, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {id: id};
    const dialogRef = this.dialog.open(EditOrderDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.cartServ.editOrderDetail(data, id, index);
          }
        }
    );   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}



