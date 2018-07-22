import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionLogPage } from './collection-log';

@NgModule({
  declarations: [
    CollectionLogPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionLogPage),
  ],
})
export class CollectionLogPageModule {}
