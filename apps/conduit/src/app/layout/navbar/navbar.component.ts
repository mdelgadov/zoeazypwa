import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@zoe/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
}
