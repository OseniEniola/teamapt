import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private eventSubscription: Subscription;
  private collapseSubmenuSubscription: Subscription;

  page: string = 'Dashboard';
  displayLogo:boolean= false
  constructor(private service: ServiceService) {
    this.eventSubscription = this.service.getActivePage().subscribe((flag) => {
      //console.log(flag)
      this.page = flag
        ? flag.charAt(0).toUpperCase() + flag.substr(1).toLowerCase()
        : 'Dashboard';
    });
    this.collapseSubmenuSubscription = this.service.getcollapeSubmenu().subscribe((flag) => {
      //console.log(flag)
      this.displayLogo = flag

    });
  }

  ngOnInit(): void {}
}
