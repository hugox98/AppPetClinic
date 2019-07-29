import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  @Input() id_Owner;

  formatDate;
  fechaRecivida;
  newFecha;
  horaRecivida;
  formatTime;
  newHora;

  citas = {
    owner_id: '',
    fecha: '', 
    hora: '',
    especialidad: '',
    mascota: '',
    confirmacion: '',    
  }
 


 
  public myForm : FormGroup;

  constructor(
    private modalCtrl: ModalController, 
    public formBuilder: FormBuilder, 
    public api: ApiDenunciasService,
    public events: Events
    ) {
    this.myForm = formBuilder.group({           
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      especialidad: ['', Validators.required],
      mascota: ['', Validators.required], 
      
    });
    console.log('user id desde le HomePage', this.id_Owner);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Citas Page');
  }

  ngOnInit() {}

  dismissMOdal(){
    this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }

 
  save(){
    console.log('Guardar')
    console.log("Array citas", this.citas); 
    //console.log("Dato formulario original ", this.myForm.value);
    this.fechaRecivida = this.myForm.value.fecha;
    this.horaRecivida = this.myForm.value.hora;        

    this.newFecha = this.getFormatDate();
    this.newHora = this.getFormatTime();

    this.myForm.value.fecha = this.newFecha;
    this.myForm.value.hora = this.newHora;
    //this.myForm.value.owner_id = id_Owner;
          
    this.citas = this.myForm.value;
    console.log("Array datos form", this.citas); 

    this.api.saveCitas(this.citas).subscribe(      
      (data) => { // Success     
        console.log("citas en el metodo save", this.citas);
        console.log("Datos formulario", data);
        console.log('Datos obtenidos: ');    
        console.log('Fecha: ', this.myForm.value.Fecha);
        console.log('Hora: ', this.myForm.value.Hora);
        console.log('Especialidad: ', this.myForm.value.Especialidad);
        console.log('Mascota: ', this.myForm.value.Mascota);
      },
      (error) =>{
        console.error("Error al guardar",error);
      });
      this.modalCtrl.dismiss( this.myForm.value);

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

  pushModalCtrl(){       
    this.modalCtrl.dismiss( this.myForm.value);
  }
}

/*

 save() {
    console.log("Array antes de citas",this.citas);
    this.citas = this.myForm.value;
    console.log("Datos forulario",this.myForm.value);
    console.log("Array despues de citas",this.citas);

    this.api.saveCitas(this.citas).subscribe(      
      (data) => { // Success     
        console.log("citas en el metodo save", this.citas);
        console.log("Datos formulario", data);          
        console.log('Fecha: ', this.myForm.value.Fecha);     
      },
      (error) =>{
        console.error("Error al guardar",error);
      });
      this.modalCtrl.dismiss( this.myForm.value);
  }
*/
