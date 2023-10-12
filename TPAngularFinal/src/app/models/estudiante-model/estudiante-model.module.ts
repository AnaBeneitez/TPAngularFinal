import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EstudianteModelModule { 
  id: number
  dni: string
  lastName: string
  firstName: string
  email: string
  cohort: number
  status: string
  gender: string
  adress: string
  phone: string
}
