import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDenunciasService {
      

  private API = 'http://192.168.43.205:8080/api';

  constructor(public http: HttpClient) {}
 
  
  getCitas():  Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({        
        'Content-type': 'application/json',
      })
    }
    return this.http.get(this.API+'/citas', httpOptions);
  }

  getCitasOwner(id):  Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    console.log('get citas');
    console.log("Ruta citas x owner ",this.API+`/citas/owners/${id}`);
    return this.http.get(this.API+`/citas/owners/${id}`) ;
  }

  saveCitas(citas): Observable<any> {
     let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': ' application/json',
      })      
    }    

    console.log('Save');
    console.log("Datos Para guardar",citas);
    return this.http.post(this.API+'/citas/new', citas);
  }


  login(firstName: String, lastName: String): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }

    console.log("Ruta",this.API+'/login1/'+firstName+'/'+lastName);
    return this.http.get(this.API+'/login1/'+firstName+'/'+lastName, httpOptions);
  }

  getMascotas():  Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    return this.http.get(this.API+'/mascotas', httpOptions);
  }

  
  getCitasFindById(id):  Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    console.log('get citas');
    console.log(id);
    return this.http.get(this.API+`/citas/${id}`, httpOptions);
  }


 
  
  updateCitas(cita){
    console.log('get cita');
    console.log(cita.id);
    return this.http.put(this.API+`/citas/${cita.id}`, {'fecha':cita.fecha});
  }

  
  deleteCitas(id):  Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    console.log('get citas id delete');
    console.log(id);
    return this.http.delete(this.API+`/citas/${id}`, httpOptions);
  }

}
