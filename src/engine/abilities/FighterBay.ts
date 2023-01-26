import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class FighterBay extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.fighterBay, karmaCost);

    this.title += "Fighter Bay";
    this.desc += "Fighters cost one less build point to deploy to this zone\nwhilst this unit is present"
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
