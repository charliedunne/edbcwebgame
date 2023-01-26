import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class MilitaryAlloys extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number,karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.militaryAlloys, karmaCost);

    this.title += "Military Alloys";
    this.desc += "Burst attacks only hit this unit on a 5 or 6.\nThis ability does not affect Fixed damage.\nIf this ship is attacked by a ship using the\nElite ability, it is still only hit on a 5 or 6\nand the Elite ability is ignored.";
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
