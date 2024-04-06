import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupManagePageRoutingModule } from './group-manage-routing.module';

import { GroupManagePage } from './group-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupManagePageRoutingModule
  ],
  declarations: [GroupManagePage]
})
export class GroupManagePageModule {}
