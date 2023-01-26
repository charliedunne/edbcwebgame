import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Stun extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.stun, karmaCost);

    this.value = value;

    this.title += "Stun " + value;
    this.desc += "When this unit damages another unit, that unit inflicts (" + value + ")\nless damage on its attacks in this round. If this reduces the damage\nbelow 0, count the result as 0. Stun counters do not stack, and only\nthe most powerful stun effect is applied to the unit on its turn. At the\nend of the round, all Stun counters are removed from units in play";
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
