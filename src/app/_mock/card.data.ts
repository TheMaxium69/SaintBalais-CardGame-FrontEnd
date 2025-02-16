import {CardInterface} from "../_interface/card.interface";

export const cards:CardInterface[] = [
  { id: 1, name: "Exemple 1", description: "ex1", isObtained: true, nbObtained: 1, card_back:{ id: 1, url:'card/card-off.png' }, card_front: { id: 2, url:'card/exemple1.png' } },
  { id: 2, name: "Exemple 2", description: "ex2", isObtained: true, nbObtained: 1, card_back:{ id: 1, url:'card/card-off.png' }, card_front: { id: 3, url:'card/exemple2.png' }  },
]
