import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Users[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'userType', 'contact', 'address', 'edit', 'delete'];
  dataSource: MatTableDataSource<Users>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private usersServ: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.subscription = this.usersServ.usersChanged.subscribe(
      (users: Users[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.loadUsers();
  }

  private loadUsers() {
    this.usersServ.getAllUsers().subscribe(
      res => {
        this.users = res['users'];
        this.usersServ.setUsers(this.users);
        this.dataSource = new MatTableDataSource(this.users);
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
      this.usersServ.delete(id, index);
      this.loadUsers();
    }
  }

  openDialog(id, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {id: id};
    const dialogRef = this.dialog.open(EditUsersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.usersServ.edit(data, id, index);
          }
        }
    );   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}