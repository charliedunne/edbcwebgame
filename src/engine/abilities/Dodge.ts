import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Dodge extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.dodge, karmaCost);

    this.value = value;

    this.title += "Dodge " +  value;
    this.desc += "Avoid taking (" + value + ") damage which has just been\ninflicted on you"

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
