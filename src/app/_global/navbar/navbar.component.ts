import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(protected app:AppComponent) {
  }

}
