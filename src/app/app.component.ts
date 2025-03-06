import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {DownbarComponent} from "./_global/downbar/downbar.component";
import {LoginComponent} from "./login/login.component";
import {NgIf} from "@angular/common";
import {CardInterface} from "./_interface/card.interface";
import {PanelComponent} from "./_global/panel/panel.component";

import {cards} from "./_mock/card.data";
import {tokenExemple} from "./_mock/token.data";
import {ApiCallInterface} from "./_interface/api-call.interface";
import {AuthService} from "./_service/auth.service";
import {UserInterface} from "./_interface/user.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DownbarComponent, LoginComponent, NgIf, PanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    /* Récupérer le token depuis le localStorage */
    const savedToken = localStorage.getItem('tokenSaintBalais');
    const savedUser = localStorage.getItem('userSaintBalais');
    if (savedToken) {
      this.token = savedToken;
      this.isLoggedIn = true;
      this.loginWithToken(savedToken);

      if (savedUser){
        this.userConnected = JSON.parse(savedUser);
      }
    }
  }

  /******************************************************************************************************************
   *
   * VARIABLE GLOBAL
   *
   * ******************************************************************************************************************/

  // SETTING
  AppEnv: string = "DEV"; // DEV or PROD
  Debug:Boolean = false; // Active la view Serv and Local

  //%     API - SB      %//
  urlApiDev: string = "https://127.0.0.1:8000";
  urlApiProd: string = "https://------";
  //%     API - SB      %//

  //%     API - TYROLIUM      %//
  urlGeneratePP:string = "https://tyrolium.fr/generate-pp/"
  urlUploadPP:string = "https://useritium.fr/uploads/pp/"
  //%     API - TYROLIUM      %//

  /*****************************************************************************************************************
   *
   * CACHE
   *
   * ******************************************************************************************************************/

  // User
  isLoggedIn: boolean = false;
  userConnected: UserInterface|null = null;
  token: string|null = null;

  // Card
  myCardGame: CardInterface[] = [];
  nbCardOpain:number = 0;
  timeForOpainBooster:number = 0;
  countdown: string = '12:00';

  /******************************************************************************************************************
   *
   * CONNEXION
   *
   * ******************************************************************************************************************/


  loginWithID(email:string, password:string): void {
    /* Connection avec l'email et le mdp */

    let bodyNoJson:any;
    bodyNoJson = {
      "email_auth":email,
      "mdp_auth":password
    };

    this.authService.postLoginUser(bodyNoJson, this.setURL()).subscribe((msgToken:ApiCallInterface) => {

      if (msgToken?.message == "Connected"){

        this.loginWithToken(msgToken.token);

      } else {

        if (msgToken?.message == "bad email"){
          Swal.fire({
            title: 'Erreur!',
            text: 'Aucun compte n\'est associé à cet email',
            icon: 'error',
            confirmButtonText: 'OK',
          })
        } else if (msgToken?.message == "bad passwd") {
          Swal.fire({
            title: 'Erreur!',
            text: 'Mot de passe incorrect',
            icon: 'error',
            confirmButtonText: 'OK',
          })
        } else {
          Swal.fire({
            title: 'Erreur!',
            text: 'Erreur lors de la connexion',
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }

      }

    }, (error) => {
      this.erreurSubcribe()
    });


  }

  loginWithToken(token:string): void {
    /* Connection avec le token */

    this.authService.postLoginToken(token, this.setURL()).subscribe((msgUser:ApiCallInterface) => {

      if (msgUser.message == "Connected"){

        this.login(msgUser.result, token);

      } else if (msgUser.message == "user ban") {

        this.loggout()

        Swal.fire({
          title: 'Ban!',
          text: 'Votre compte à été bannie',
          icon: 'error',
          confirmButtonText: 'OK'
        })


      } else {

        this.loggout();
        this.erreurSubcribe();

      }

    }, (error) => {

      this.loggout()
      this.erreurSubcribe();
    });
  }

  login(user:any, token:string): void {
    /* Action a faire une fois connecter */

    this.token = token;
    this.userConnected = user;
    this.isLoggedIn = true;

    /* Stocker dans le localstorage */
    localStorage.setItem('tokenSaintBalais', token);
    localStorage.setItem('userSaintBalais', JSON.stringify(user));

  }

  loggout(): void {

    /* Supprimer le token du localStorage */
    localStorage.removeItem('tokenSaintBalais');
    localStorage.removeItem('userSaintBalais');

    /* Vidé les variable */
    this.isLoggedIn = false;
    this.token = null;
    this.userConnected = null;


    /* Vider le cache */
    this.myCardGame = [];
    this.nbCardOpain = 0;
    this.timeForOpainBooster = 0;
    this.countdown = '12:00';

    this.router.navigate(['/']);
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


  generatePPUseritium(username:string|undefined, pp:string|undefined):string {

    let result:string = this.urlGeneratePP;

    if (pp){
      result = this.urlUploadPP + pp
    } else if (username) {
      result = this.urlGeneratePP + '?l=' + username[0] + '&c=c59662';
    }

    return result;

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

  startCountdown(seconds: number): void {
    let timeLeft = seconds;

    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        this.countdown = '00:00';
        return;
      }

      const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
      this.countdown = `${hours}:${minutes}`;
      timeLeft--;
    }, 1000);
  }




}

