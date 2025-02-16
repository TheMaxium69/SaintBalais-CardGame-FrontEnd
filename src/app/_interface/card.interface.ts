import {PictureInterface} from "./picture.interface";

export interface CardInterface {

  id: number;
  name: string;
  description: string;
  card_front: PictureInterface;
  card_back: PictureInterface;
  isObtained: boolean;
  nbObtained: number;

}
