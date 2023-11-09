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

  modalForm: FormGroup
  modalEstudiante = new EstudianteModelModule()

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

    this.modalForm = new FormGroup ({
      "id2": new FormControl(this.modalEstudiante.id, Validators.required),
      "dni2": new FormControl(this.modalEstudiante.dni, Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])),
      "apellido2": new FormControl(this.modalEstudiante.lastName, Validators.required),
      "nombre2": new FormControl(this.modalEstudiante.firstName, Validators.required),
      "email2": new FormControl(this.modalEstudiante.email, Validators.compose([Validators.required, Validators.email]))
    })
  }

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

  get id2() {return this.modalForm.get("id2")}
  get dni2(){return this.modalForm.get("dni2")}
  get apellido2() {return this.modalForm.get("apellido2")}
  get nombre2() {return this.modalForm.get("nombre2")}
  get email2() {return this.modalForm.get("email2")}


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

    this.modalEstudiante.id = e.id
    this.modalEstudiante.dni = e.dni
    this.modalEstudiante.lastName = e.lastName
    this.modalEstudiante.firstName = e.firstName
    this.modalEstudiante.email = e.email

    console.log(this.modalEstudiante)

    this.dni3 = e.dni
    this.apellido3 = e.lastName
    this.nombre3 = e.firstName
    this.email3 = e.email

    this.modalServicio.open(ver).result.then(() => {
      if(this.modalEstudiante.dni.trim() !== this.dni3.trim() || this.modalEstudiante.lastName.trim() !== this.apellido3.trim() || this.modalEstudiante.firstName.trim() !== this.nombre3.trim() || this.modalEstudiante.email.trim() !== this.email3.trim()) {
        let s = new EstudianteModelModule()
        s.id = this.modalEstudiante.id
        s.dni = this.dni2?.value
        s.lastName = this.apellido2?.value
        s.firstName = this.nombre2?.value
        s.email = this.email2?.value
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
    
    this.modalForm.reset()
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
