import { Component, OnInit } from '@angular/core';
import { EstudianteModelModule } from 'src/app/models/estudiante-model/estudiante-model.module';
import { EstudianteService } from 'src/app/services/estudiante.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.css']
})
export class ListadoEstudiantesComponent implements OnInit {

  listadoEstudiantes = new Array<EstudianteModelModule>();

  estudiante = new EstudianteModelModule()
  estudianteForm: FormGroup


  constructor(private estServicio: EstudianteService, private modalServicio: NgbModal){

    this.estudiante.dni = ""
    this.estudiante.lastName = ""
    this.estudiante.firstName = ""
    this.estudiante.email = ""

    this.estudianteForm = new FormGroup({
      "dni": new FormControl(this.estudiante.dni, Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])),
      "apellido": new FormControl(this.estudiante.lastName, Validators.required),
      "nombre": new FormControl(this.estudiante.firstName, Validators.required),
      "email": new FormControl(this.estudiante.email, Validators.compose([Validators.required, Validators.email]))
    })

  }

  id2: number
  dni2: string
  apellido2: string
  nombre2: string
  email2: string

  dni3: string
  apellido3: string
  nombre3: string
  email3: string

  ngOnInit(): void {
    this.listarAlumnos()
  }

  get dni(){return this.estudianteForm.get("dni")}
  get apellido() {return this.estudianteForm.get("apellido")}
  get nombre() {return this.estudianteForm.get("nombre")}
  get email() {return this.estudianteForm.get("email")}

  listarAlumnos() {
    this.estServicio.listarAlumnos().subscribe(response => {
      this.listadoEstudiantes = response

      this.estudianteForm.reset()
      this.estudiante.dni = ""
      this.estudiante.lastName = ""
      this.estudiante.firstName = ""
      this.estudiante.email = ""

      document.getElementsByTagName('input')[0].focus()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  agregar() {
    let e = new EstudianteModelModule()
    e.dni = this.dni?.value
    e.lastName = this.apellido?.value
    e.firstName = this.nombre?.value
    e.email = this.email?.value
    e.cohort = 0
    e.status = 'activo'
    e.gender = 'masculino'
    e.adress = 'abc123'
    e.phone = '000'

    this.estServicio.agregar(e).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
      document.getElementsByTagName('input')[0].focus()
    })
  }

  vista(ver: any, e: EstudianteModelModule) {

    this.id2 = e.id
    this.dni2 = e.dni
    this.apellido2 = e.lastName
    this.nombre2 = e.firstName
    this.email2 = e.email

    this.dni3 = e.dni
    this.apellido3 = e.lastName
    this.nombre3 = e.firstName
    this.email3 = e.email

    this.modalServicio.open(ver).result.then(() => {
      if(this.dni2.trim() !== '' && this.apellido2.trim() !== '' && this.nombre2.trim() !== '' && this.email2.trim() !== '' &&
      (this.dni2.trim() !== this.dni3.trim() || this.apellido2.trim() !== this.apellido3.trim() || this.nombre2.trim() !== this.nombre3.trim() || this.email2.trim() !== this.email3.trim())) {
        let s = new EstudianteModelModule()
        s.id = this.id2
        s.dni = this.dni2
        s.lastName = this.apellido2
        s.firstName = this.nombre2
        s.email = this.email2
        s.cohort = 0
        s.status = 'activo'
        s.gender = 'masculino'
        s.adress = 'abc123'
        s.phone = '000'

        this.estServicio.actualizar(s).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    })
    
    this.estudiante.dni = ""
    this.estudiante.lastName = ""
    this.estudiante.firstName = ""
    this.estudiante.email = ""
  }

  borrar(id: number) {
    this.estServicio.borrar(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }
}
