import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
var LoginPage = /** @class */ (function () {
    function LoginPage(api, modalController, formBuilder, router) {
        this.api = api;
        this.modalController = modalController;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.Login = function (form) {
        var _this = this;
        console.log("Datos del form", form.value);
        this.firstName = form.value.firstName;
        this.lastName = form.value.lastName;
        this.api.login(this.firstName, this.lastName).subscribe(function (res) {
            console.log("Valor respuesta", res);
            if (res === -1) {
                _this.router.navigateByUrl('login');
            }
            else {
                _this.router.navigateByUrl('home');
                return _this.user_id = res;
            }
        });
    };
    LoginPage.prototype.setUserId = function (valor) {
        this.user_id = valor;
    };
    LoginPage.prototype.getUserId = function () {
        return this.user_id;
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ApiDenunciasService,
            ModalController,
            FormBuilder,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map