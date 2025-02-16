import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from "../../_interface/card.interface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input()
  card: CardInterface|null = null;


  ngOnInit() {
    console.log(this.card);
  }

}
