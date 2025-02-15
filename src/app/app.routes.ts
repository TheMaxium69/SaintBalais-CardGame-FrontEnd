import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrComponent} from "./_global/err/err.component";
import {DeckComponent} from "./deck/deck.component";
import {SettingComponent} from "./setting/setting.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'deck', component: DeckComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrComponent },
];
