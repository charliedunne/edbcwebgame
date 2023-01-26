import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Betrayer extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.overkill, karmaCost);

    this.title += "Betrayer";
    this.desc += "When this card acts your opponent can\nspend 5 karma points to make it attack\n one of your own ships in the same zone.\nYour opponent decides which attack to use.\nThis attack drains the card";
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
