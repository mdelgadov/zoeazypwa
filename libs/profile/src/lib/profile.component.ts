import { User } from '@zoe/api';
import { AuthFacade } from '@zoe/auth';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { combineLatest, map, takeUntil, tap } from 'rxjs/operators';

import { ProfileFacade } from './+state/profile.facade';
import { Profile } from './+state/profile.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile>;
  currentUser$: Observable<User>;
  isUser$: Subject<boolean> = new Subject();
  unsubscribe$: Subject<void> = new Subject();
  following: boolean;
  username: string;

  constructor(private facade: ProfileFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.profile$ = this.facade.profile$;
    this.currentUser$ = this.authFacade.user$;

    this.profile$
      .pipe(
        combineLatest(this.currentUser$),
        tap(([p, u]) => {
          this.username = p.username;
          this.following = p.following;
        }),
        map(([p, u]) => p.username === u.username),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(isUser => this.isUser$.next(isUser));
  }

  toggleFollowing() {
    if (this.following) {
      this.facade.unfollow(this.username);
    } else {
      this.facade.follow(this.username);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
