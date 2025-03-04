import { Component } from '@angular/core';
import {BoosterComponent} from "../home/booster/booster.component";
import {NavbarComponent} from "../_global/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BoosterComponent,
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private app:AppComponent) {
  }

  login(value: any) {


    this.app.loginWithID(value.email, value.password);


  }



}
