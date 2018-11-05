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
    LoginPageComponent,
    MyInfoPageComponent,
    LoginFormComponent,
    AddOrderFormComponent,
    CreateAccFormComponent,
    AccFormComponent,
    OrdersTableComponent,
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
    CreateAccFormComponent,
    AccFormComponent,
    OrdersTableComponent,
    ScrollToFirstInvalidDirective
  ]
})

export class SharedModule {
}
