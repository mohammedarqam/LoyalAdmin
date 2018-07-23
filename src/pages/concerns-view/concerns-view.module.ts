import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcernsViewPage } from './concerns-view';

@NgModule({
  declarations: [
    ConcernsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcernsViewPage),
  ],
})
export class ConcernsViewPageModule {}
