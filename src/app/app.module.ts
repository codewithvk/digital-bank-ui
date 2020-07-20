/** Angular Imports */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/** Nebular Theme Imports */
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/** ngrx Imports */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store';

/** Custom Components */
import { AppComponent } from './app.component';

/** Custom Modules */
import { LoginModule } from './login/login.module';

/** Custom Providers */
import { PermittableGroupIdMapper } from './services/security/authz/permittable-group-id-mapper';

/** Custom Services */
import { HttpClientService } from './services/http/http.service';
import { IdentityService } from './services/identity/identity.service';
import { AuthenticationService } from './services/security/authn/authentication.service';
import { NotificationService } from './services/notification/notification.service';

/** Custom Effects */
import { SecurityRouteEffects } from './store/security/effects/route.effects';
import { SecurityApiEffects } from './store/security/effects/service.effects';
import { SecurityNotificationEffects } from './store/security/effects/notification.effects';
import { RoleSearchApiEffects } from './store/role/effects/service.effects';

/** App Routing Module */
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,

    /** Theme modules */
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,

    /** ngrx root modules */
    StoreModule.forRoot({ root: reducer }),
    EffectsModule.forRoot([SecurityApiEffects, SecurityRouteEffects, SecurityNotificationEffects, RoleSearchApiEffects]),

    // In a production build, disable the Store Devtools
    StoreDevtoolsModule.instrument({
      name: 'Digital bank',
    }),
  ],
  providers: [
    HttpClientService,
    AuthenticationService,
    PermittableGroupIdMapper,
    IdentityService,
    NotificationService,
    ...appRoutingProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}