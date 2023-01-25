import Ability from "../Ability";
import { AbilityType } from "../AbilityTypes";
import { ActionType } from '../ActionTypes';


export default class Overkill extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

    /* - Constructor ------------------------------------------------------- */

  constructor(id: number) {
    // Base constructor
    super(id, AbilityType.overkill);

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

  run(): void {}
}
