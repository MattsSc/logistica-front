import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './shared/pages/error404-page/error404-page.component';
import {HomePageComponent} from './shared/pages/home-page/home-page.component';
import {AppConfig} from './configs/app.config';
import {LoginPageComponent} from './shared/pages/login-page/login-page.component';
import {AuthGuard} from './core/services/auth/auth.guard';
import {MyInfoPageComponent} from './shared/pages/my-info-page/my-info-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'login', component: LoginPageComponent, pathMatch: 'full'},
  {path: 'myAccount', component: MyInfoPageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: AppConfig.routes.error404, component: Error404PageComponent},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
