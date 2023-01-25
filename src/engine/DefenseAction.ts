import Action, { ActionType } from "./Action";
import { Target, Location } from "./ActionTypes";

export default class DefenseAction extends Action {
  /* - Private members --------------------------------------------------- */

  private text: string;

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  public target: Target;
  public damage: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, target: Target, damage: number) {

    // Base constructor
    super(id, ActionType.defense);

    this.target = target;
    this.damage = damage;
    this.text = "Remove " + this.damage + " damage from";

    if (target.itself === true) {
      this.text += " this ship";
    }

    if (target.all === true) {
      this.text += " all cards in this Zone";
    }

    if (target.faction !== undefined) {
      this.text += " any " + target.faction + " ship"
    }

    if (target.role !== undefined) {
      this.text += " any ";

      for (let i = 0; i < target.role.length; ++i) {
        this.text += target.role[i];

        if (i < target.role.length - 1) {
          this.text += " OR ";
        }
      }

      this.text += " ship";
    }
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

  toString(): string {
    return this.text;
  }
}
