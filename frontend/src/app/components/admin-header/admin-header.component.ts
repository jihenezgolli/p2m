import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {

  sessionUserName: string;
  user: Users;
  subscription: Subscription;

  constructor(private usersServ: UsersService) { }

  ngOnInit() {
    this.subscription = this.usersServ.accountChanged.subscribe(
      (user: Users) => {
        this.user = user;
        this.sessionUserName = this.user.name;
      }
    );
    if(sessionStorage.getItem("sessionUserData")) {
      this.sessionUserName = JSON.parse(sessionStorage.sessionUserData).name;
    } else {
      this.sessionUserName = '';
    }
  } 

  logout() {
    this.usersServ.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
