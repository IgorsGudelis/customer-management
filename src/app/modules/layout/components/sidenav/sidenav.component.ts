import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SIDENAV_ITEMS } from '../../fixtures/sidenav-items';
import { SidenavItemModel } from '../../models/side-nav-item.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  public sidenavItems: SidenavItemModel[] = SIDENAV_ITEMS;
}
