import { Component } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  constructor(protected app:AppComponent) {}

}
