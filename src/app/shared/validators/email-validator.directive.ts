import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEmailValidator } from './app-email-validator';

@Directive({
  selector: '[appEmail]',
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:EmailValidatorDirective,
      multi:true
    }
  ]
})
export class EmailValidatorDirective implements Validator, OnChanges{
  @Input() appEmail:string[] = []
  validator:ValidatorFn = () => null
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const emailChnages = changes['appEmail']
    if(emailChnages){
      
      this.validator = appEmailValidator(emailChnages.currentValue )
  }
    
  }
}
