import { AttackType } from "../actions/AttackAction";
import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class PowerUpWeapons extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;
  attackType: AttackType;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, type: AttackType, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.powerUpWeapons, karmaCost);

    this.value = value;
    this.attackType = type;

    this.title += "Power Up Weapons: +" + value + " " + type.toString();
    this.desc += "This unit gains +" + value + " " + type.toString() + "\ndamage for its next attack";
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
