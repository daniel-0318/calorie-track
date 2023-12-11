import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';
import { DateRangeModalComponent } from './date-range-modal/date-range-modal.component';



@NgModule({
  declarations: [
    MapModalComponent,
    DateRangeModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MapModalComponent,
    DateRangeModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
