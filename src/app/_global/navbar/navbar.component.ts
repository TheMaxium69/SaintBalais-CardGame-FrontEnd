import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppComponent} from "../../app.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  constructor(protected app:AppComponent) {
  }



}

