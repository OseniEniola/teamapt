import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private service:ServiceService) { }
  active:string = "dashboard";
  hide:boolean=false
  @Output() fromHide = new EventEmitter<boolean>();


  ngOnInit(): void {
  }
  setActive(d:string){
    this.active=d.toLowerCase()
    this.service.sendActivePage(d)
  }
  toggleHide(){
    this.hide = !this.hide
    this.fromHide.emit(this.hide)
    this.service.sendcollapeSubmenu(this.hide)
  }
 
}
