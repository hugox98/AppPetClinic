import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { ModalController } from '@ionic/angular';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(api, modalController, formBuilder) {
        this.api = api;
        this.modalController = modalController;
        this.formBuilder = formBuilder;
        this.user = {
            firstName: '',
            lastName: ''
        };
        this.loginForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent.prototype.login = function () {
        this.user.firstName = this.loginForm.value.firstName;
        console.log("firstanme ", this.user.firstName);
        this.user.lastName = this.loginForm.value.lastName;
        console.log("lastname ", this.user.lastName);
        this.api.saveCitas(this.user).subscribe(function (data) {
            console.log("Datos formulario", data);
        }, function (error) {
            console.error("Error al logear", error);
        });
        //this.modalController.dismiss( this.loginForm.value);
    };
    LoginFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiDenunciasService,
            ModalController,
            FormBuilder])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map