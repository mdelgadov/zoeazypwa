import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, User } from '@zoe/api';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(map(result => result.user));
  }
}
