import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }


  private subject = new BehaviorSubject<any>(null);
  private collapeSubmenu = new BehaviorSubject<boolean>(false);

  sendActivePage(product: any) {
    //   console.log('SendViewDetailsEvent called');
    this.subject.next(product);
  }

  getActivePage() {
    //  console.log('GetviewDetailsEvent called');
    return this.subject.asObservable();
  }
  sendcollapeSubmenu(product: any) {
    //   console.log('SendViewDetailsEvent called');
    this.collapeSubmenu.next(product);
  }

  getcollapeSubmenu() {
    //  console.log('GetviewDetailsEvent called');
    return this.collapeSubmenu.asObservable();
  }
}
