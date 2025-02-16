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

  constructor(protected app:AppComponent,
              private cardService:CardService) {}

  ngOnInit() {

    this.getCards();

    this.getPageWidth();
    window.addEventListener('resize', () => {
      this.getPageWidth();
    })
  }

  getPageWidth() {
    this.pageWidth = window.innerWidth;
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

  getNumberCard(): number{

    if (this.pageWidth < 380){
      return 2;
    } else if (this.pageWidth < 543){
      return 3;
    } else if (this.pageWidth < 700){
      return 4
    } else {
      return 5;
    }

  }


  getNumberShelf(){

    // console.log('all card : ', this.app.myCardGame.length);
    // console.log('nb card : ', this.getNumberCard());

    let nbShelf = this.app.myCardGame.length / this.getNumberCard();

    // console.log(nbShelf);
    return Math.ceil(nbShelf);

  }

}
