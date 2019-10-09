import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

import { environment } from '../../../../environments/environment';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { PlaceLocation } from '../../../places/location.model';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  @Output() locationPick = new EventEmitter<PlaceLocation>();

  selectedLocationImage: string;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl
      .create({
        component: MapModalComponent
      })
      .then(modalEl => {
        modalEl.onDidDismiss().then(modalData => {
          if (!modalData.data) {
            return;
          }
          const pickedLocation: PlaceLocation = {
            lat: modalData.data.lat,
            lng: modalData.data.lng,
            address: null,
            staticMapImageUrl: null
          };
          this.isLoading = true;
          this.getAddress(modalData.data.lat, modalData.data.lng)
            .pipe(
              switchMap(address => {
                pickedLocation.address = address;
                return of(
                  this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
                );
              })
            )
            .subscribe(staticMapImageUrl => {
              pickedLocation.staticMapImageUrl = staticMapImageUrl;
              this.selectedLocationImage = staticMapImageUrl;
              this.isLoading = false;
              this.locationPick.next(pickedLocation);
            });
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

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }
}
