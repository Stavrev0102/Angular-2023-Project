import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './validators/email-validator.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    EmailValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[LoaderComponent,EmailValidatorDirective]
})
export class SharedModule { }
