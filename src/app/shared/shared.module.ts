import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapModalComponent } from './map-modal/map-modal.component';
import { LoactionPickerComponent } from './pckers/loaction-picker/loaction-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LoactionPickerComponent, MapModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [LoactionPickerComponent, MapModalComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
