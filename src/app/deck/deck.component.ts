import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../_global/navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {CardComponent} from "./card/card.component";

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

  ngOnInit() {
    this.getPageWidth(); // Récupérer la largeur initiale de la page
    window.addEventListener('resize', () => {
      this.getPageWidth(); // Mettre à jour la largeur lorsque la page est redimensionnée
    });
  }

  getPageWidth() {
    this.pageWidth = window.innerWidth;
    console.log(this.pageWidth);
  }

}
