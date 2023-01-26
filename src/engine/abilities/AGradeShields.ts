import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class AGradeShields extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.aGradeShields, karmaCost);

    this.title += "A-Grade Shields";
    this.desc += "Avoid 1 point of damage when attacked.\nYou take this point off the total damage inflicted by a single unit.\nIf a ship has two attack forms, such as Fixed 2 and Burst 2,\nyou can only take off a single point of damage,\nnot one point from the Fixed and one from the Burst.\nThis ability is continuous, so you can apply it\n to each individual attack that affects you.";
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
