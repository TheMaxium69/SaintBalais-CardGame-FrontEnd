import { Component } from '@angular/core';
import {NavbarComponent} from "../_global/navbar/navbar.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {

}
