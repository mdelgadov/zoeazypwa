import { ArticleListModule } from '@zoe/article-list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomeEffects } from './+state/home.effects';
import { HomeFacade } from './+state/home.facade';
import { homeInitialState, homeReducer } from './+state/home.reducer';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleListModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent, resolve: { HomeResolverService } }
    ]),
    StoreModule.forFeature('home', homeReducer, { initialState: homeInitialState }),
    EffectsModule.forFeature([HomeEffects])
  ],
  declarations: [HomeComponent, TagsListComponent],
  providers: [HomeEffects, HomeResolverService, HomeService, HomeFacade]
})
export class HomeModule {}
