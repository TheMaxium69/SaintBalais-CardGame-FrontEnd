import { Component } from '@angular/core';
import {NavbarComponent} from "../_global/navbar/navbar.component";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {

}
