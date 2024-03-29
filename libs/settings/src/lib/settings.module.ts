import { AuthGuardService } from '@zoe/auth';
import { NgrxFormsModule } from '@zoe/ngrx-forms';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsEffects } from './+state/settings.effects';
import { settingsReducer } from './+state/settings.reducer';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SettingsComponent, canActivate: [AuthGuardService] }
    ]),
    StoreModule.forFeature('settings', settingsReducer, { initialState: {} }),
    EffectsModule.forFeature([SettingsEffects])
  ],
  declarations: [SettingsComponent],
  providers: [SettingsEffects, SettingsService]
})
export class SettingsModule {}
