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
    this.getNavbars();
  }

  getCards() {

    if (this.app.myCardGame.length == 0){

      this.cardService.getMyCards(this.app.setURL(), this.app.createCors()).subscribe((response: { message:string, result:CardInterface[] }) => {

        if (response.message == "good") {
          /* TRIE DE CARTE */
          this.app.myCardGame = response.result.sort((a, b) => {
            if (a.version !== b.version) {
              return a.version - b.version; // Trier par version en premier
            } else if (a.type !== b.type) {
              return a.type - b.type; // Si les versions sont égales, trier par type
            } else {
              return a.rarity - b.rarity; // Si les versions et les types sont égaux, trier par rareté
            }
          });
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

  getNavbars() {
    this.cardService.getNavbar(this.app.setURL(), this.app.createCors()).subscribe((response: { message:string, result: { time:number, nbCard:number } }) => {
      if (response.message == "good"){
        this.app.nbCardOpain = response.result.nbCard;
        this.app.timeForOpainBooster = response.result.time;
        this.startCountdown(this.app.timeForOpainBooster);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue',
        })
      }
    }, (error) => this.app.erreurSubcribe() )
  }


  startCountdown(seconds: number): void {
    let timeLeft = seconds;

    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        this.app.countdown = '00:00';
        return;
      }

      const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
      this.app.countdown = `${hours}:${minutes}`;
      timeLeft--;
    }, 1000);
  }


}
