import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

@NgModule({
  declarations: [
    ImagePickerComponent,
    LocationPickerComponent,
    MapModalComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ImagePickerComponent,
    LocationPickerComponent,
    MapModalComponent
  ],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
