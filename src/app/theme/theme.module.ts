import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditThemeComponent } from './edit-theme/edit-theme.component';





@NgModule({
  declarations: [
    NewThemeComponent,
    CurrentThemeComponent,
    EditThemeComponent,
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ThemeModule { }
