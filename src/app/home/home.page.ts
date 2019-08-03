

import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, Events, NavController } from '@ionic/angular';
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
  especialidades = [];
  ms = [];
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
    this.ionViewDidLoad();
  }
  ngOnInit() { }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidLoad();
    event.target.complete();
  }

  ionViewDidLoad() {
    //this.getAll() 
    //this.getCitasID();
    this.getCitasByOwner();
    this.getMascotasID();
    this.getEspecialidades();
  }


  getCitasByOwner() {
    this.user_id = this.activateRoute.snapshot.paramMap.get('id');
    console.log("User owner enviar: ", this.user_id);
    this.api.getCitasOwner(this.user_id).subscribe(
      (data) => { // Success
        console.log('citas: ', data);
        this.citas = data;
        console.log("Mis citas ", this.citas);
      },
      (error) => {
        console.error(error);
      });
  }
  getCitasID() {
    console.log('ionViewDidLoad');
    this.api.getCitasFindById(12).subscribe(
      (data) => { // Success
        console.log('citas: ', data);
        this.citas = data;
        console.log("Mis citas:", this.citas);
      },
      (error) => {
        console.error(error);
      });
  }

  getAll() {
    console.log('ionViewDidLoad');
    this.api.getCitas().subscribe(
      (data) => { // Success
        console.log('citas: ', data);
        this.citas = data;
        console.log("Mis citas ", this.citas);
      },
      (error) => {
        console.error(error);
      });
  }

  getAllMascotas() {
    this.api.getMascotas().subscribe(
      (data) => {
        this.mascotas = data;

        console.log("Todas las mascotas", this.mascotas);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  getMascotasID() {
    this.user_id = this.activateRoute.snapshot.paramMap.get('id');
    console.log("Mis mascotas");
    this.api.getMascotasUserFindById(this.user_id).subscribe(
      (data) => { // Success
        this.mascotas = data;
        console.log("Mis mascotas", this.mascotas);

      },
      (error) => {
        console.error("Error al guardar", error);
      });

  }
  getEspecialidades() {
    this.api.getEspecialidades().subscribe(
      (data) => { // Success        
        this.especialidades = data;
        console.log("Especialidades", this.especialidades);
      },
      (error) => {
        console.error("Error al consultar", error);
      });
  }
  calculateAgeColor(confirmacion: number) {
    if (confirmacion < 1)
      return 'danger';
    else
      return 'tertiary';
  }
  
  async action(item: any, index) {
    console.log("Item ", item);
    console.log("Indice cita", index);
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
            this.deleteAlert(item.id);
          }
        }, {
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

  async deleteAlert(posicion: number) {
    console.log("Arreglo", this.citas[1]);
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '¿Deseas eliminar esta cita?',
      buttons: [
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
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Se elimino el elemento');
            this.api.deleteCitas(posicion).subscribe(
              (data) => { // Success
                console.log('citas: ', data);
                this.citas.splice(posicion, 1);
                this.getCitasByOwner();
              },
              (error) => {
                console.error(error);
              });

          }
        }]
    });
    await alert.present();
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
            data = Object.assign(data, { 'id': item.id })
            console.log(data);
            this.api.updateCitas(data).subscribe(
              (result) => { // Success
                console.log('citas: ', result);
                this.citas.splice(index, 1);
                this.getAll()
              },
              (error) => {
                console.error(error);
              });

          }
        }
      ]
    });
    await prompt.present();
  }


  iraCita() {
    this.user_id = this.activateRoute.snapshot.paramMap.get('id')
    console.log("Id Owner para crear cita", this.user_id)
    var id = 4;
    this.navCtrl.navigateForward(['/citas', this.user_id]);
  }



  async presentModal() {
    const modal = await this.modal.create({
      component: ModalFormComponent
    });

    modal.onDidDismiss().then((data) => { //Para generar  otro arreglo de tipo data    
      this.citas.push(data.data);
      console.log("Valores data", data.data);

    });

    return await modal.present();
  }

  logOut() {
    this.navCtrl.navigateForward(['login']);
  }


}



