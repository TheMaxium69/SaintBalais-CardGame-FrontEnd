import { Component } from '@angular/core';
import {AppComponent} from "../app.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  constructor(protected app:AppComponent) {}

}
