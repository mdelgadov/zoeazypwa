import { ArticleListConfig, articleListInitialState } from '@zoe/article-list';
import * as fromArticleList from '@zoe/article-list';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GetProfile } from './+state/profile.actions';
import { Profile } from './+state/profile.reducer';

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.store.dispatch(new GetProfile(username));
  }
}

@Injectable()
export class ProfileArticlesResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.store.dispatch(
      new fromArticleList.SetListConfig(<ArticleListConfig>{
        ...articleListInitialState.listConfig,
        filters: {
          ...articleListInitialState.listConfig.filters,
          author: username
        }
      })
    );
  }
}

@Injectable()
export class ProfileFavoritesResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.parent.params['username'];
    this.store.dispatch(
      new fromArticleList.SetListConfig(<ArticleListConfig>{
        ...articleListInitialState.listConfig,
        filters: {
          ...articleListInitialState.listConfig.filters,
          favorited: username
        }
      })
    );
  }
}
