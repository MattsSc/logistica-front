import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {CreateAccFormComponent} from './components/create-acc-form/create-acc-form.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HeroCardComponent} from './components/hero-card/hero-card.component';
import {ScrollToFirstInvalidDirective} from './directives/scroll-to-first-invalid.directive';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {WebStorageModule} from 'ngx-store';
import { HeroLoadingComponent } from './components/hero-loading/hero-loading.component';

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
    LoginFormComponent,
    CreateAccFormComponent,
    Error404PageComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
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
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    LoginFormComponent,
    CreateAccFormComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    ScrollToFirstInvalidDirective
  ]
})

export class SharedModule {
}
