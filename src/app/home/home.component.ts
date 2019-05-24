import { Component, OnInit, HostListener } from '@angular/core';
import { NotifyService } from './../services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private notifyService: NotifyService) { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  onClick(eventData: MouseEvent) {
    if (!(eventData.target instanceof HTMLButtonElement)) {
      this.notifyService.onOutsideClicked.emit();
    }
  }
}
