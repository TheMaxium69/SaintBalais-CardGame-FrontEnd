import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-downbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './downbar.component.html',
  styleUrl: './downbar.component.css'
})
export class DownbarComponent implements OnInit {

  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

}
