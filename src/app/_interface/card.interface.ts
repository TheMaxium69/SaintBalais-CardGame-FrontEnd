import {PictureInterface} from "./picture.interface";

export interface CardInterface {

  id: number;
  name: string;
  content: string;
  rarity: number;
  type: number;
  version: number;
  cardFront: PictureInterface;
  cardBack: PictureInterface;
  isObtained: boolean;
  nbObtained: number;

}
