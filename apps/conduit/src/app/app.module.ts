import { ApiModule } from '@zoe/api';
import { AuthModule } from '@zoe/auth';
import { NgrxErrorModule } from '@zoe/ngrx-error';
import { NgrxRouterModule } from '@zoe/ngrx-router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: '', loadChildren: '@zoe/home#HomeModule' },
        { path: 'article/:slug', loadChildren: '@zoe/article#ArticleModule' },
        { path: 'settings', loadChildren: '@zoe/settings#SettingsModule' },
        { path: 'editor', loadChildren: '@zoe/editor#EditorModule' },
        { path: 'profile/:username', loadChildren: '@zoe/profile#ProfileModule' }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    ),
    StoreModule.forRoot({}, { metaReducers: !environment.production ? [storeFreeze] : [] }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
