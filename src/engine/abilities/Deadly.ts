import { Target } from "../actions/ActionTypes";
import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Deadly extends Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  value: number;
  target?: Target;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, value: number, target?: Target, karmaCost?: number) {
    // Base constructor
    super(id, AbilityType.deadly, karmaCost);

    this.value = value;
    if (target !== undefined)
    {
        this.target = target;
    }

    this.title += "Deadly " + value;

    if (target !== undefined)
    {
        this.title += " against ";
        if (target.faction !== undefined)
        {
             this.title += target.faction.toString();
        }

        if (target.role !== undefined)
        {
            for (let i = 0; i < target.role.length; ++i)
            {
                this.title += target.role[i].toString();

                if (i < target.role.length - 1) {
                    this.title += " OR ";
                  }
            }
        }

        this.title += " units";
    }

    this.desc += "Inflict an extra (" + value + ") damage when you roll any 6’s on\nyour Burst attack dice. This ability only affects Burst attacks, and\ncannot be used in attacks without at least one Burst die. The extra\ndamage is only applied once, no matter how many 6’s you roll.";
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
