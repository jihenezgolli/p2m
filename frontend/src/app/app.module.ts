import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccountComponent } from './components/account/account.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ProductComponent } from './components/product/product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { UIComponent } from './components/u-i/u-i.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { OrderComponent } from './components/order/order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ViewOrderDetailComponent } from './components/view-order-detail/view-order-detail.component';
import { EditOrderDetailComponent } from './components/edit-order-detail/edit-order-detail.component';
import {MatCardModule} from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHeaderComponent,
    DashboardComponent,
    UsersComponent,
    CategoryComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    PageNotFoundComponent,
    AccountComponent,
    EditUsersComponent,
    EditCategoryComponent,
    ProductComponent,
    EditProductComponent,
    AddProductComponent,
    ViewProductComponent,
    UIComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailsComponent,
    CartComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserAccountComponent,
    OrderComponent,
    EditOrderComponent,
    ViewOrderComponent,
    ViewOrderDetailComponent,
    EditOrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    HttpClientModule,
    MaterialModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditUsersComponent,
    EditCategoryComponent,
    EditProductComponent,
    EditOrderComponent,
    EditOrderDetailComponent,
  ]
})
export class AppModule { }
