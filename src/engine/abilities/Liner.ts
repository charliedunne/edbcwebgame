import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Liner extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.liner, karmaCost);

    this.value = value;

    this.title += "Liner " +  value;
    this.desc += "During the Build phase, move this ship one zone to your left\nand gain (" + value + ") Build points\nIf your opponent has won a zone your liner will move\nonto the next one. The board ‘wraps around’,\nso if you go off the left hand side of the board\nmove the Liner to the furthest right zone.\nIf the liner cannot move you won't get any build points";
  }

  /* Getters ------------------------------------------------------------- */

  /* None */

  /* Setters ------------------------------------------------------------- */

  /* None */

  /* Private interface --------------------------------------------------- */

  /* None */

  /* Protected interface ------------------------------------------------- */

  /* None */

  /* Public interface ---------------------------------------------------- */

  run(): void { }
}
