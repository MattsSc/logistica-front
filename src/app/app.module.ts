import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {WebpackTranslateLoader} from './webpack-translate-loader';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {AuthService} from './core/services/auth/auth.service';
import {AuthGuard} from './core/services/auth/auth.guard';
import {UserService} from './core/services/user/user.service';
import {CookieService} from 'ngx-cookie-service';
import {AddOrderFormComponent} from './shared/components/add-order-form/add-order-form.component';
import {OrderService} from './core/services/order/order.service';
import {MovilService} from './core/services/movil/movil.service';
import {AddMovilFormComponent} from './shared/components/add-movil-form/add-movil-form.component';
import {AccFormComponent} from './shared/components/acc-form/acc-form.component';
import {UpdateOrderFormComponent} from './shared/components/update-order-form/update-order-form.component';
import {DeliveryService} from './core/services/delivery/delivery.service';

@NgModule({
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [ AddOrderFormComponent, AddMovilFormComponent, AccFormComponent, UpdateOrderFormComponent],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig}, AuthService, UserService, MovilService, DeliveryService, OrderService, AuthGuard, CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
