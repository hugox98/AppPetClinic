import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';
var ModalFormComponent = /** @class */ (function () {
    function ModalFormComponent(modalCtrl, formBuilder, api, events) {
        this.modalCtrl = modalCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.events = events;
        this.citas = {
            owner_id: '',
            fecha: '',
            hora: '',
            especialidad: '',
            mascota: '',
            confirmacion: '',
        };
        this.myForm = formBuilder.group({
            fecha: ['', Validators.required],
            hora: ['', Validators.required],
            especialidad: ['', Validators.required],
            mascota: ['', Validators.required],
        });
    }
    ModalFormComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Citas Page');
    };
    ModalFormComponent.prototype.ngOnInit = function () { };
    ModalFormComponent.prototype.dismissMOdal = function () {
        this.modalCtrl.dismiss({
            'dismissed': true,
        });
    };
    ModalFormComponent.prototype.save = function () {
        var _this = this;
        console.log('Guardar');
        console.log("Array citas", this.citas);
        //console.log("Dato formulario original ", this.myForm.value);
        this.fechaRecivida = this.myForm.value.fecha;
        this.horaRecivida = this.myForm.value.hora;
        this.newFecha = this.getFormatDate();
        this.newHora = this.getFormatTime();
        this.myForm.value.fecha = this.newFecha;
        this.myForm.value.hora = this.newHora;
        this.citas = this.myForm.value;
        console.log("Array datos form", this.citas);
        this.api.saveCitas(this.citas).subscribe(function (data) {
            console.log("citas en el metodo save", _this.citas);
            console.log("Datos formulario", data);
            console.log('Datos obtenidos: ');
            console.log('Fecha: ', _this.myForm.value.Fecha);
            console.log('Hora: ', _this.myForm.value.Hora);
            console.log('Especialidad: ', _this.myForm.value.Especialidad);
            console.log('Mascota: ', _this.myForm.value.Mascota);
        }, function (error) {
            console.error("Error al guardar", error);
        });
        this.modalCtrl.dismiss(this.myForm.value);
    };
    ModalFormComponent.prototype.getFormatDate = function () {
        var dateObject = new Date(this.fechaRecivida);
        var year = dateObject.getFullYear().toString();
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate().toString();
        if (month < 10) {
            return this.formatDate = year + '-0' + month + '-' + date;
        }
        else {
            return this.formatDate = year + '-' + month + '-' + date;
        }
    };
    ModalFormComponent.prototype.getFormatTime = function () {
        var timeObject = new Date(this.horaRecivida);
        var hour = timeObject.getHours().toString();
        var min = timeObject.getMinutes().toString();
        var sec = timeObject.getSeconds().toString();
        return this.formatTime = hour + ':' + min + ':' + sec;
    };
    ModalFormComponent.prototype.pushModalCtrl = function () {
        this.modalCtrl.dismiss(this.myForm.value);
    };
    ModalFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-form',
            templateUrl: './modal-form.component.html',
            styleUrls: ['./modal-form.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            FormBuilder,
            ApiDenunciasService,
            Events])
    ], ModalFormComponent);
    return ModalFormComponent;
}());
export { ModalFormComponent };
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
//# sourceMappingURL=modal-form.component.js.map