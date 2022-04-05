import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CategoryComponent } from './components/category/category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccountComponent } from './components/account/account.component';
import { AdminGuard } from './guards/admin.guard';
import { ProductComponent } from './components/product/product.component';
import { UIComponent } from './components/u-i/u-i.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserGuard } from './guards/user.guard';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:'', redirectTo:'ws', pathMatch:'full'},
  { path:'admin', component: AdminComponent, canActivate:[AdminGuard], children: [
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    { path:'dashboard', component: DashboardComponent },
    { path:'users', component: UsersComponent },
    { path:'category', component: CategoryComponent },
    { path:'product', component: ProductComponent },
    { path:'order', component: OrderComponent },
    { path:'account', component: AccountComponent },
    { path:'**', component: PageNotFoundComponent }
  ] },
  { path:'adminLogin', component: AdminLoginComponent },
  { path:'adminRegister', component: AdminRegisterComponent },
  { path:'ws', component: UIComponent, children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    { path:'home', component: HomeComponent },
    { path:'shop/:id/:title', component: ShopComponent },
    { path:'pd/:id', component: ProductDetailsComponent },
    { path:'cart', component: CartComponent },
    { path:'userLogin', component: UserLoginComponent },
    { path:'userRegister', component: UserRegisterComponent },
    { path:'userAccount', component: UserAccountComponent, canActivate:[UserGuard] },
    { path:'**', component: PageNotFoundComponent }
  ] },
  { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
