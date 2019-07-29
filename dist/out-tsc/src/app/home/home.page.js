import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, Events } from '@ionic/angular';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { LoginPage } from '../login/login.page';
var useer_id = new LoginPage();
var HomePage = /** @class */ (function () {
    function HomePage(api, modal, alertController, event, 
    // public login:LoginPage,
    actionSheetController) {
        this.api = api;
        this.modal = modal;
        this.alertController = alertController;
        this.event = event;
        this.actionSheetController = actionSheetController;
        this.citas = [];
        this.mascotas = [];
        // this.user_id=this.login.getUserId();       
        this.ionViewDidLoad();
        //console.log(this.user_id);
        //this.getAllMascotas();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log("User id en home", this.user_id);
        console.log(useer_id.user_id);
        this.getAll();
        //this.getCitasByOwner();
    };
    HomePage.prototype.getCitasByOwner = function () {
        var _this = this;
        console.log('ionViewDidLoad');
        this.api.getCitasOwner(this.user_id).subscribe(function (data) {
            console.log('citas: ', data);
            _this.citas = data;
            console.log("Mis citas ", _this.citas);
        }, function (error) {
            console.error(error);
        });
    };
    HomePage.prototype.getAll = function () {
        var _this = this;
        console.log('ionViewDidLoad');
        this.api.getCitas().subscribe(function (data) {
            console.log('citas: ', data);
            _this.citas = data;
            console.log("Mis citas ", _this.citas);
        }, function (error) {
            console.error(error);
        });
    };
    HomePage.prototype.getAllMascotas = function () {
        var _this = this;
        this.api.getMascotas().subscribe(function (data) {
            _this.mascotas = data;
            console.log("Mis mascotas", _this.mascotas);
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.action = function (item, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Item ", item);
                        console.log("Indice cita", index);
                        console.log('Action');
                        return [4 /*yield*/, this.actionSheetController.create({
                                backdropDismiss: false,
                                header: 'Citas',
                                buttons: [
                                    {
                                        text: 'Eliminar',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            console.log('delete clicked');
                                            _this.api.deleteCitas(item.id).subscribe(function (data) {
                                                console.log('citas: ', data);
                                                _this.citas.splice(item, 1);
                                            }, function (error) {
                                                console.error(error);
                                            });
                                        }
                                    }, {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showPrompt = function (item, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var prompt;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
                                    handler: function (data) {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Save',
                                    handler: function (data) {
                                        console.log('Saved clicked');
                                        data = Object.assign(data, { 'id': item.id });
                                        console.log(data);
                                        _this.api.updateCitas(data).subscribe(function (result) {
                                            console.log('citas: ', result);
                                            _this.citas.splice(index, 1);
                                            _this.getAll();
                                        }, function (error) {
                                            console.error(error);
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        prompt = _a.sent();
                        return [4 /*yield*/, prompt.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.presentModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modal.create({
                            component: ModalFormComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            _this.citas.push(data.data);
                            console.log("Valores data", data.data);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiDenunciasService,
            ModalController,
            AlertController,
            Events,
            ActionSheetController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
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
//# sourceMappingURL=home.page.js.map