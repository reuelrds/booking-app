import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

import { environment } from '../../../../environments/environment';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-loaction-picker',
  templateUrl: './loaction-picker.component.html',
  styleUrls: ['./loaction-picker.component.scss']
})
export class LoactionPickerComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  onPickLoaction() {
    this.modalCtrl
      .create({
        component: MapModalComponent
      })
      .then(modalEl => {
        modalEl.onDidDismiss().then(modalData => {
          if (!modalData.data) {
            return;
          }
          this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
            address => {
              console.log(address);
            }
          );
        });
        modalEl.present();
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.httpClient
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map(resData => {
          if (!resData || !resData.results || resData.results.length === 0) {
            return null;
          }
          return resData.results[0].formatted_address;
        })
      );
  }
}
