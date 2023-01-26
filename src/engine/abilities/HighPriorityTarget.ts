import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class HighPriorityTarget extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.highPriorityTarget, karmaCost);

    this.title += "High Priority Target";
    this.desc += "While this uni is in play. All enemy units\nin the zone must attack it"
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
