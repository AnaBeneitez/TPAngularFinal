import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudianteModelModule } from '../models/estudiante-model/estudiante-model.module';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private url = 'https://backend-idra-production.up.railway.app/student'

  constructor(private http: HttpClient) { }

  listarAlumnos(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  agregar(s: EstudianteModelModule): Observable<any> {
    return this.http.post(this.url, s)
  }

  actualizar(s: EstudianteModelModule): Observable<any> {
    return this.http.post(this.url + '/' + s.id + '/update', s)
  }

  borrar(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }

}
