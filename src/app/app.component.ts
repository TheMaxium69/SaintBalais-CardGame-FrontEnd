import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {DownbarComponent} from "./_global/downbar/downbar.component";
import {LoginComponent} from "./login/login.component";
import {NgIf} from "@angular/common";
import {CardInterface} from "./_interface/card.interface";
import {PanelComponent} from "./_global/panel/panel.component";

import {cards} from "./_mock/card.data";
import {tokenExemple} from "./_mock/token.data";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DownbarComponent, LoginComponent, NgIf, PanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /******************************************************************************************************************
   *
   * VARIABLE GLOBAL
   *
   * ******************************************************************************************************************/

  //%     API - SB      %//
  AppEnv: string = "DEV"; // DEV or PROD or PRODMAX
  urlApiDev: string = "https://127.0.0.1:8000";
  urlApiProd: string = "https://------";
  //%     API - SB      %//

  //%     API - TYROLIUM      %//
  urlGeneratePP:string = "https://tyrolium.fr/generate-pp/"
  //%     API - TYROLIUM      %//

  // SETTING
  Debug:Boolean = false; // Active la view Serv and Local
  isLoggedIn: boolean = true;
  userConnected: /*UserInterface|*/any;
  token: string|any = tokenExemple;
  currentUrl: string = "/";


  /*****************************************************************************************************************
   *
   * CACHE
   *
   * ******************************************************************************************************************/


  // myCardGame: CardInterface[] = cards;
  myCardGame: CardInterface[] = [];
  nbCardOpain:number = 0;
  timeForOpainBooster:string = '';






  /******************************************************************************************************************
   *
   * CONNEXION
   *
   * ******************************************************************************************************************/


  loggout(): void {

    this.isLoggedIn = false;
    this.token = undefined;
    this.userConnected = undefined;


    /* Vider le cache */
    this.myCardGame = [];

  }


  loginWithID(): void {
    /* Connection avec l'email et le mdp */
  }

  loginWithCache(): void {
    /* Connection avec le cache */
  }

  login(): void {
    /* Connection une fois le token recuperer */
  }



  /*****************************************************************************************************************
   *
   * FUNCTION GLOBAL
   *
   * ******************************************************************************************************************/

  //CORS
  createCors(isFormData: boolean = false): {headers: HttpHeaders} {

      let headers: HttpHeaders;

      if (!isFormData){

        /* JSON */
        if (this.token){
          headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.token,
          });
        } else {
          headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        }

      } else {

        /* FORM DATA */
        if (this.token){
          headers = new HttpHeaders({
            'Authorization': 'Bearer '+this.token,
          });
          headers.append('Content-Type', 'multipart/form-data');
        } else {
          headers = new HttpHeaders({});
          headers.append('Content-Type', 'multipart/form-data');
        }

      }

      const options: {headers: HttpHeaders}  = { headers: headers };
      // console.log(options);
      return options;
    }

  //SET URL API
  setURL():string {

    if (this.AppEnv == "DEV"){
      return this.urlApiDev;
    } else if (this.AppEnv == "PROD") {
      return this.urlApiProd;
    } else {
      return this.urlApiProd;
    }

  }


  generatePPUseritium(pp:string|undefined|null, username:string|undefined, colorSelected:string|undefined):string {

    let result:string = this.urlGeneratePP;

    if (pp){
      result = pp
    } else if (username) {

      let color
      if (colorSelected){
        if (Array.isArray(colorSelected)) {
          color = colorSelected[0];
        } else {
          color = colorSelected;
        }
      }
      result = this.urlGeneratePP + '?l=' + username[0] + '&c='+ color.substring(1);

    }

    return 'background-image: url(' + result + ')';

  }

  erreurSubcribe(){
    Swal.fire({
      title: 'Erreur!',
      text: 'Erreur de notre serveur',
      icon: 'error',
      confirmButtonText: 'OK',
      // confirmButtonColor:
    })
  }





}

