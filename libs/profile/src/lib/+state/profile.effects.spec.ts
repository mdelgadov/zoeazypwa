import { ApiService } from '@zoe/api';
import { ActionsService } from '@zoe/shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ProfileService } from '../profile.service';
import { ProfileEffects } from './profile.effects';

describe('ProfileEffects', () => {
  let actions;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ProfileEffects,
        DataPersistence,
        provideMockActions(() => actions),
        ProfileService,
        ApiService,
        ActionsService
      ]
    });

    effects = TestBed.get(ProfileEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
