import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeAgoPipe } from 'time-ago-pipe';
import { SafePipe } from '../../../pipes/safe/safe.pipe';

import { ListPage } from './list.page';
import { DetailPage } from '../detail/detail.page';

const routes: Routes = [
  { path: '', component: ListPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListPage, DetailPage, SafePipe, TimeAgoPipe],
  entryComponents: [DetailPage]
})
export class MessagePageModule {}
