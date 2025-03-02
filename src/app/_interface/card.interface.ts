import {PictureInterface} from "./picture.interface";

export interface CardInterface {

  id: number;
  name: string;
  description: string;
  cardFront: PictureInterface;
  cardBack: PictureInterface;
  isObtained: boolean;
  nbObtained: number;

}
