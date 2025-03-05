import { Component } from '@angular/core';
import {AppComponent} from "../../app.component";
import {CardService} from "../../_service/card.service";
import {CardInterface} from "../../_interface/card.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-booster',
  standalone: true,
  imports: [],
  templateUrl: './booster.component.html',
  styleUrl: './booster.component.css'
})
export class BoosterComponent {

  constructor(protected app:AppComponent,
              private cardService:CardService) { }

  openBooster() {
    if(this.app.countdown == "00:00") {

      this.cardService.openBooster(this.app.setURL(), this.app.createCors()).subscribe((response: { message:string, result:CardInterface[] }) => {

        if (response.message == "good") {

          /* Mettre a jour en local */
          this.app.nbCardOpain += response.result.length;

          response.result.forEach((myCardNew:CardInterface) => {

            this.app.myCardGame.forEach((card:CardInterface) => {

              if (myCardNew.id == card.id) {
                card.nbObtained++;
                card.isObtained = true;
              }

            })

          })

          



        } else {

          Swal.fire({
            title: 'Erreur!',
            text: 'Erreur lors de l\'ouverture du booster',
            icon: 'error',
            confirmButtonText: 'OK',
          })

        }


      }, (error) => this.app.erreurSubcribe())


    }


  }
}
