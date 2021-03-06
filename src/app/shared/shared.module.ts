import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {CreateAccFormComponent} from './components/create-acc-form/create-acc-form.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {ScrollToFirstInvalidDirective} from './directives/scroll-to-first-invalid.directive';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {WebStorageModule} from 'ngx-store';
import {OrdersTableComponent} from './components/orders-table/orders-table.component';
import {AddOrderFormComponent} from './components/add-order-form/add-order-form.component';
import {AccFormComponent} from './components/acc-form/acc-form.component';
import {MyInfoPageComponent} from './pages/my-info-page/my-info-page.component';
import {HomeAdminPageComponent} from './pages/home-admin-page/home-admin-page.component';
import {MovilesTableComponent} from './components/moviles-table/moviles-table.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {AddMovilFormComponent} from './components/add-movil-form/add-movil-form.component';
import {UpdateOrderFormComponent} from './components/update-order-form/update-order-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    WebStorageModule
  ],
  declarations: [
    HomePageComponent,
    HomeAdminPageComponent,
    LoginPageComponent,
    MyInfoPageComponent,
    LoginFormComponent,
    AddOrderFormComponent,
    AddMovilFormComponent,
    CreateAccFormComponent,
    UpdateOrderFormComponent,
    AccFormComponent,
    OrdersTableComponent,
    MovilesTableComponent,
    UsersTableComponent,
    Error404PageComponent,
    HeaderComponent,
    SpinnerComponent,
    ScrollToFirstInvalidDirective
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    NgxExampleLibraryModule,
    WebStorageModule,
    HeaderComponent,
    SpinnerComponent,
    LoginFormComponent,
    MyInfoPageComponent,
    AddOrderFormComponent,
    UpdateOrderFormComponent,
    AddMovilFormComponent,
    UpdateOrderFormComponent,
    CreateAccFormComponent,
    AccFormComponent,
    OrdersTableComponent,
    MovilesTableComponent,
    UsersTableComponent,
    ScrollToFirstInvalidDirective
  ]
})

export class SharedModule {
}
