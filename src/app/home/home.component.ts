import { Component } from '@angular/core';
import {NavbarComponent} from "../_global/navbar/navbar.component";
import {BoosterComponent} from "./booster/booster.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    BoosterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
