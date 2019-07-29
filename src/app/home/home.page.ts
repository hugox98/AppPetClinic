

import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, Events, NavController} from '@ionic/angular';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  static id_owner;
  
  citas = [];
  mascotas = [];
  mascotaOwner;
  user_id = null;


  constructor(
    private api: ApiDenunciasService, 
    private modal: ModalController,
    public alertController: AlertController, 
    public event: Events,
    private activateRoute: ActivatedRoute,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    ) {     
    this.ngOnInit();
  }
  ngOnInit() {   
    this.ionViewDidLoad();    
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidLoad();
    event.target.complete();
  }

  ionViewDidLoad() {
    this.user_id =this.activateRoute.snapshot.paramMap.get('id');
    HomePage.id_owner = this.user_id;
    console.log("User  id owner recibido:",HomePage.id_owner );
    var idOwner = HomePage.id_owner;
    //this.getAll()
    this.getCitasByOwner(idOwner);
    //this.getCitasID();
    //this.getAllMascotas();
    //this.getMascotaOwner()
    console.log("OWNER: ",HomePage.id_owner);
  }
    

  getCitasByOwner(id){  
    var idUser = id; 
    console.log("User owner enviar: ",idUser);
     this.api.getCitasOwner(idUser).subscribe(
      (data) =>  { // Success
        console.log('citas: ', data); 
        this.citas = data;   
        console.log("Mis citas ",this.citas);
       },
       (error) =>{
         console.error(error);
       });
  }
  getMascotaOwner() {
    console.log("MASCOTAS ID OWNER", this.mascotas)
  }
  getCitasID(){
    console.log('ionViewDidLoad');
    this.api.getCitasFindById(12).subscribe(
      (data) => { // Success
       console.log('citas: ', data);
       this.citas = data;
       console.log("Mis citas ",this.citas);
      },
      (error) =>{
        console.error(error);
      });
  }

  getAll(){
    console.log('ionViewDidLoad');
    this.api.getCitas().subscribe(
      (data) => { // Success
       console.log('citas: ', data);
       this.citas = data;
       console.log("Mis citas ",this.citas);
      },
      (error) =>{
        console.error(error);
      });
  }

  getAllMascotas() {
    this.api.getMascotas().subscribe(
      (data) => {
        this.mascotas = data;
        console.log("Mis mascotas", this.mascotas);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async action(item: any, index){
    console.log("Item ",item);
    console.log("Indice cita",index);
    console.log('Action');
    let actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      header: 'Citas',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('delete clicked');

            this.api.deleteCitas(item.id).subscribe(
              (data) => { // Success
               console.log('citas: ', data);
               this.citas.splice(item,1);
              },
              (error) =>{
                console.error(error);
              });
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present(); 
  }


  async showPrompt(item, index) {
  let prompt = await this.alertController.create({
    header: item.name,
    message: "Edit cita",
    inputs: [
      {
        name: 'name',
        value: item.name
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          data = Object.assign (data, {'id': item.id})
          console.log(data);
          this.api.updateCitas(data).subscribe(
            (result) => { // Success
             console.log('citas: ', result);
             this.citas.splice(index,1);
             this.getAll()
            },
            (error) =>{
              console.error(error);
            });

        }
      }  
    ]
  });
  await prompt.present();
  }

  iraCita(){
    this.user_id =this.activateRoute.snapshot.paramMap.get('id')
    console.log("Id Owner para crear cita", this.user_id )
    var id = 4;
    this.navCtrl.navigateForward( ['/citas', this.user_id]);
  }



  async presentModal(){
    const modal = await this.modal.create({
      component: ModalFormComponent
    });

    modal.onDidDismiss().then((data) => { //Para generar  otro arreglo de tipo data    
      this.citas.push(data.data);      
      console.log("Valores data",data.data);
     
    });
    
    return await modal.present();
  }


}





/*
  Menu(posicion: any){
    console.log("posicion ", posicion);
    this.presentActionSheet(posicion);

  }

  async presentActionSheet(posicion:number){
    const actionSheet = await this.actionSheetController.create({
      header: 'You choose a option',
      backdropDismiss: false,
      buttons: [{
        text:'Delete',
        role: 'destructive',
        icon: 'trash',
        handler:() =>{
          console.log('Delete clicked');
          this.presentAlert(posicion);
        }
        },{
          text:'Cancel',
          icon:'close',
          role:'cancel',
          handler:() =>{
            console.log('Cancel clicked');
          }
        }]
      });
    await actionSheet.present();
  }

  async presentAlert(posicion: number){
    console.log("Arreglo", this.myArray[1]);
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '¿Seguro que desea eliminar ?',
      buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Se cancelo el elemento');
        }
      },
      {
        text: 'Ok',
        role: 'delete',
        cssClass:'secondary',
        handler:(blah) =>{
          console.log('Se elimino el elemento');
          this.myArray.splice(posicion,1);
        
        }
      }]
    });
    await alert.present();
  }
  
  async editInput(posicion: number) {

    const prompt =  await this.alertController.create({
      header: 'Edit',      
      inputs: [    
        {
          name: 'name',
          value: this.nombreEdit,
          placeholder: 'your name'
        },

        {
          name: 'email',
          value: this.myArray[posicion],
          placeholder: 'your@email.com'
        },
        {
          name: 'edad',
          placeholder: 'rour age'
        }        
        ],
        buttons : [
         {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
         },
         {
          text: "Save",
          handler: data => {
            console.log("search clicked");
          }
         }
        ]
      });
     await prompt.present();
  }
*/

