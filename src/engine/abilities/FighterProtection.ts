import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class FighterProtection extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.fighterProtection, karmaCost);

    this.value = value;

    this.title += "Fighter protection " +  value;
    this.desc += "Your ship is protected agains fighter. They should inflict (" + value + ") less damage against you in any attack";
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
