import { Component, OnInit } from '@angular/core';
import { EstudianteModelModule } from 'src/app/models/estudiante-model/estudiante-model.module';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.css']
})
export class ListadoEstudiantesComponent implements OnInit {


  listadoEstudiantes = new Array<EstudianteModelModule>();

  constructor(private estServicio: EstudianteService){}


  dni: string
  apellido: string
  nombre: string
  email: string

  ngOnInit(): void {
    this.listarAlumnos()
  }

  listarAlumnos() {
    this.estServicio.listarAlumnos().subscribe(response => {
      this.listadoEstudiantes = response
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  agregar() {
    if(this.dni.trim() !== '' && this.apellido.trim() !== '' && this.nombre.trim() !== '' && this.email.trim() !== '') {
      let s = new EstudianteModelModule()
      s.dni = this.dni
      s.lastName = this.apellido
      s.firstName = this.nombre
      s.email = this.email
      s.cohort = 0
      s.status = 'activo'
      s.gender = 'masculino'
      s.adress = 'abc123'
      s.phone = '000'

      this.estServicio.agregar(s).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
      })
    }
    
  }

  ver(s: EstudianteModelModule) {

  }

  borrar(id: number) {

  }

}
