import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Overkill extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.overkill, karmaCost);

    this.title += "Overkill";
    this.desc += "Put any excess damage counters onto other enemy ships in\nthe same zone. You can distribute these damage counters in any way\nyou see fit. Your opponent can attempt to avoid the damage with the\nDodge ability or with an Action card that avoids damage as normal";
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
