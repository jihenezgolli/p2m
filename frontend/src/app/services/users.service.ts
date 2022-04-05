import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from '../models/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersChanged = new Subject<Users[]>();
  private users: Users[] = [];
  accountChanged = new Subject<Users>();
  private account: Users;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  setUsers(users: Users[]) {
    this.users = users;
    this.usersChanged.next(this.users);
  }

  register(data){
    this.http.post('http://localhost:8000/api/register', data).subscribe(
      res => {
        if(res['user'] == null){
          this.snackBar.open('Email already exists.', 'Dismiss', {duration: 3000});
        } else if(res['user'].userType == 'user') {
          this.users.push(res['user']);
          this.usersChanged.next(this.users);
          this.snackBar.open('Registered successful.', 'Dismiss', {duration: 3000});
          this.router.navigate(['ws/userLogin']);
        } else {
          this.users.push(res['user']);
          this.usersChanged.next(this.users);
          this.snackBar.open('Registered successful.', 'Dismiss', {duration: 3000});
          this.router.navigate(['adminLogin']);
        }
      }
    );
  }

  login(data){
    this.http.post('http://localhost:8000/api/login', data).subscribe(
      res => {
        if(res['user'] == 0) {
          this.snackBar.open('Email is incorrect.', 'Dismiss', {duration: 3000});
        } else if (res['user'] == 1) {
          this.snackBar.open('Password is incorrect.', 'Dismiss', {duration: 3000});
        } else {
          this.account = res['user'];
          this.accountChanged.next(this.account);
          sessionStorage.setItem("sessionUserData", JSON.stringify(res['user']));
          if(JSON.parse(sessionStorage.sessionUserData).userType == 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['/']);
          }
          this.snackBar.open('Login successful', 'Dismiss', {duration: 3000});
        }
      }
    );
  }

  logout() {
    if(JSON.parse(sessionStorage.sessionUserData).userType == 'admin') {
      sessionStorage.removeItem('sessionUserData');
      this.snackBar.open('Logout successful', 'Dismiss', {duration: 3000});
      this.router.navigate(['adminLogin']);
    } else {
      sessionStorage.removeItem('sessionUserData');
      this.account = JSON.parse(sessionStorage.getItem('sessionUserData'));
      this.accountChanged.next(this.account);
      this.snackBar.open('Logout successful', 'Dismiss', {duration: 3000});
      this.router.navigate(['ws/userLogin']);
    }
  }

  getAllUsers(){
    return this.http.get('http://localhost:8000/api/user');
  }

  getSingleUsers(id){
    return this.http.get('http://localhost:8000/api/user/'+id+'/edit');
  }

  delete(id, index) {
    this.http.delete('http://localhost:8000/api/user/'+id).subscribe(
      res => {
        this.snackBar.open('Deleted.', 'Dismiss', {duration: 3000});
        this.users.splice(index, 1);
        this.usersChanged.next(this.users);
      }
    );
  }

  edit(data, id, index) {
    this.http.put('http://localhost:8000/api/user/'+id, data).subscribe(
      res => {
        this.snackBar.open('Edited.', 'Dismiss', {duration: 3000});
        this.users[index] = res['user'];
        this.usersChanged.next(this.users);
      }
    );
  }

  editAccount(data, id) {
    this.http.put('http://localhost:8000/api/user/'+id, data).subscribe(
      res => {
        this.account = res['user'];
        this.accountChanged.next(this.account);
        sessionStorage.setItem("sessionUserData", JSON.stringify(res['user']));
        this.snackBar.open('Edited.', 'Dismiss', {duration: 3000});
      }
    );
  }

}
