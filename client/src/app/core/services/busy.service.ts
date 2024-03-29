import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(private spinnerServices: NgxSpinnerService) { }

  Busy() {
    this.busyRequestCount++;
    this.spinnerServices.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }

  idel(){
    this.busyRequestCount--;
    if(this.busyRequestCount<=0){
      this.busyRequestCount=0;
      this.spinnerServices.hide();
    }
  }

}
