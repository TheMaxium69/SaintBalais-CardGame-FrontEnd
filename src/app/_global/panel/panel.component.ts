import {Component, OnInit} from '@angular/core';
import {DownbarComponent} from "../downbar/downbar.component";
import {RouterOutlet} from "@angular/router";
import {CardInterface} from "../../_interface/card.interface";
import Swal from "sweetalert2";
import {AppComponent} from "../../app.component";
import {CardService} from "../../_service/card.service";

@Component({
  selector: 'app-panel',
  standalone: true,
    imports: [
        DownbarComponent,
        RouterOutlet
    ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  constructor(protected app:AppComponent,
              private cardService:CardService) {}

  ngOnInit() {

    /* Recuperation des informations */
    this.getCards();
  }

  getCards() {

    if (this.app.myCardGame.length == 0){

      this.cardService.getMyCards(this.app.setURL(), this.app.createCors()).subscribe((response: { message:string, result:CardInterface[] }) => {

        if (response.message == "good") {
          this.app.myCardGame = response.result;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue',
          })
        }
      }, (error) => this.app.erreurSubcribe() )

    }

  }

}
