import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-downbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './downbar.component.html',
  styleUrl: './downbar.component.css'
})
export class DownbarComponent {

}
