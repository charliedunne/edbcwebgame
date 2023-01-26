import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Overload extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.overload, karmaCost);

    this.title += "Overload " + value;
    this.desc += "Gain (" + value + ") extra burst attack dice for this attack";
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
