import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiDenunciasService } from '../services/api-denuncias.service';
import { ModalController, NavController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { Injectable, Directive} from '@angular/core';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
@Injectable()
export class LoginPage implements OnInit {

    firstName;
    lastName;
    user_id = '';
 

  constructor(
    public api: ApiDenunciasService,   
    public formBuilder: FormBuilder, 
    private router: Router,
    private navCtrl: NavController,

  ) {}

  ngOnInit() {
  } 
  
  Login(form) { 
    console.log("Datos del form", form.value); 
    this.firstName = form.value.firstName;  
    this.lastName = form.value.lastName;

    this.api.login(this.firstName, this.lastName ).subscribe( (res) => {     
      if(res === -1) {
        this.router.navigateByUrl('login');
      } else {               
        this.user_id = res;      
        this.navCtrl.navigateForward( ['/home', this.user_id]);
       // this.router.navigateByUrl('home',  {user_id: this.user_id});            
      }      
    });
  }   
  
  
}
