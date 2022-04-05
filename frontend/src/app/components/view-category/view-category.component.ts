import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit, OnDestroy {

  categories: Categories[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<Categories>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private categoriesServ: CategoriesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.categoriesServ.categoriesChanged.subscribe(
      (categories: Categories[]) => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
        this.categoriesServ.setCategories(this.categories);
        this.dataSource = new MatTableDataSource(this.categories);
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
      this.categoriesServ.delete(id, index);
    }
  }

  openDialog(id, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {id: id};
    const dialogRef = this.dialog.open(EditCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.categoriesServ.edit(data, id, index);
          }
        }
    );   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
