import { Component, OnInit, Input } from '@angular/core';
import { Events, NavController } from '@ionic/angular'
import { FormBuilder } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  formatDate;
  fechaRecivida;
  newFecha;
  horaRecivida;
  formatTime;
  newHora;
  user_id;

  citas = {
    owner_id: '',
    fecha: '', 
    hora: '',
    especialidad: '',
    mascota: '',
    confirmacion: '',    
  }


  constructor(  
    public formBuilder: FormBuilder, 
    public api: ApiDenunciasService,
    public events: Events,
    public navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    ) {
   
    //console.log('user id desde le HomePage', this.id_Owner);
  }

  ionViewDidLoad() {
   

  }

  ngOnInit() {
   
  }

  generarCita(form){ 
    this.user_id =this.activateRoute.snapshot.paramMap.get('id');
    console.log("ID owner para enviar ", this.user_id);
    
    console.log('Generar Cita')
    console.log("Array citas", this.citas); 
    //console.log("Dato formulario original ", this.form.value);
    this.fechaRecivida = form.value.fecha;
    this.horaRecivida = form.value.hora;        

    this.newFecha = this.getFormatDate();
    this.newHora = this.getFormatTime();

    form.value.fecha = this.newFecha;
    form.value.hora = this.newHora;
    form.value.owner_id = this.user_id;
    form.value.confirmacion = 0;
        
    this.citas = form.value;
    console.log("Array datos form", this.citas); 

    this.api.saveCitas(this.citas).subscribe(      
      (data) => { // Success     
        console.log("citas en el metodo save", this.citas);
        console.log("Datos formulario", data);
        console.log('Datos obtenidos: ');    
        console.log('Fecha: ', form.value.Fecha);
        console.log('Hora: ', form.value.Hora);
        console.log('Especialidad: ', form.value.Especialidad);
        console.log('Mascota: ', form.value.Mascota);

      },
      (error) =>{
        console.error("Error al guardar",error);
      });
      this.navCtrl.navigateForward( ['/home', this.user_id]);
    }

  getFormatDate(){
    var dateObject = new Date(this.fechaRecivida);
  
    var year = dateObject.getFullYear().toString();      
    var month = dateObject.getMonth() + 1;        
    var date = dateObject.getDate().toString();

    if (month < 10 ) {
      return this.formatDate = year + '-0' + month + '-' + date;      
    } else {
      return this.formatDate = year + '-' + month + '-' + date;      
    }    
  }

  getFormatTime() {
    var timeObject = new Date(this.horaRecivida);
    
    var hour = timeObject.getHours().toString();    
    var min = timeObject.getMinutes().toString();    
    var sec = timeObject.getSeconds().toString();    

    return this.formatTime = hour + ':' + min + ':' + sec;    
  }

}
