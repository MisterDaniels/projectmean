import { UsersModule } from './../users/users.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [UsersComponent, UserCreateComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UsersModule,
    PagesRoutingModule
  ]
})

export class PagesModule { }
