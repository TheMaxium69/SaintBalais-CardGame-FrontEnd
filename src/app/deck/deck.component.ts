import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../_global/navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {CardComponent} from "./card/card.component";
import {AppComponent} from "../app.component";
import {CardService} from "../_service/card.service";
import {CardInterface} from "../_interface/card.interface";
import {ApiCallInterface} from "../_interface/api-call.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    CardComponent,
    NgIf
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent implements OnInit {
  pageWidth: number = 0;

  constructor(private app:AppComponent,
              private cardService:CardService) {}

  ngOnInit() {

    this.getCards();

    this.getPageWidth(); // Récupérer la largeur initiale de la page
    window.addEventListener('resize', () => {
      this.getPageWidth(); // Mettre à jour la largeur lorsque la page est redimensionnée
    });

  }

  getPageWidth() {
    this.pageWidth = window.innerWidth;
    console.log(this.pageWidth);
  }

  getCards() {

    // this.app.myCardGame
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
