import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hide:boolean=false;
  title = 'TeamAPT';


  setFromHide(fromHide: boolean) {
    this.hide = fromHide;
    console.log(this.hide)
  }
  
}
