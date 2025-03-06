import {PictureInterface} from "./picture.interface";

export interface CardInterface {

  id: number;
  name: string;
  content: string;
  rarity: number;
  type: number;
  version: number;
  cardFront: PictureInterface;
  card_front: PictureInterface|undefined;
  cardBack: PictureInterface;
  card_back: PictureInterface|undefined;
  isObtained: boolean;
  nbObtained: number;

}
