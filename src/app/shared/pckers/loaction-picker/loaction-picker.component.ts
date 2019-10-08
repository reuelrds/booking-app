import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-loaction-picker',
  templateUrl: './loaction-picker.component.html',
  styleUrls: ['./loaction-picker.component.scss']
})
export class LoactionPickerComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onPickLoaction() {
    this.modalCtrl
      .create({
        component: MapModalComponent
      })
      .then(modalEl => {
        modalEl.onDidDismiss().then(modalData => {
          console.log(modalData.data);
        });
        modalEl.present();
      });
  }
}
