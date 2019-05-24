import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  onOutsideClicked = new EventEmitter();
  onButtonClicked = new EventEmitter<Event>();

  constructor() { }
}
