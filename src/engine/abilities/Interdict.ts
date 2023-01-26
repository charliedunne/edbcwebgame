import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Interdict extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.interdict, karmaCost);

    this.title += "Interdict";
    this.desc += "This unit becomes the target of the current attack";

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
