import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ApiDenunciasService = /** @class */ (function () {
    //private API = 'http://192.168.0.10:3000/api/report';
    function ApiDenunciasService(http) {
        this.http = http;
        this.API = 'http://192.168.43.180:8080/api';
    }
    ApiDenunciasService.prototype.getCitas = function () {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        return this.http.get(this.API + '/citas', httpOptions);
    };
    ApiDenunciasService.prototype.getCitasOwner = function (id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        console.log('get citas');
        console.log(id);
        return this.http.get(this.API + ("/citas/owners/" + id), httpOptions);
    };
    ApiDenunciasService.prototype.saveCitas = function (citas) {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': ' application/json',
            })
        };
        console.log('Save');
        console.log("Datos en el save", citas);
        return this.http.post(this.API + '/citas/new', citas, httpOptions);
    };
    ApiDenunciasService.prototype.login = function (firstName, lastName) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        console.log("Ruta", this.API + '/login1/' + firstName + '/' + lastName);
        return this.http.get(this.API + '/login1/' + firstName + '/' + lastName, httpOptions);
    };
    ApiDenunciasService.prototype.getMascotas = function () {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        return this.http.get(this.API + '/mascotas', httpOptions);
    };
    ApiDenunciasService.prototype.getCitasFindById = function (id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        console.log('get citas');
        console.log(id);
        return this.http.get(this.API + ("/citas/" + id), httpOptions);
    };
    ApiDenunciasService.prototype.updateCitas = function (cita) {
        console.log('get cita');
        console.log(cita.id);
        return this.http.put(this.API + ("/citas/" + cita.id), { 'fecha': cita.fecha });
    };
    ApiDenunciasService.prototype.deleteCitas = function (id) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
            })
        };
        console.log('get citas id delete');
        console.log(id);
        return this.http.delete(this.API + ("/citas/" + id), httpOptions);
    };
    ApiDenunciasService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiDenunciasService);
    return ApiDenunciasService;
}());
export { ApiDenunciasService };
//# sourceMappingURL=api-denuncias.service.js.map