import Action  from "./Action";
import { ActionType, Management, Target } from './ActionTypes';

export default class ManagementAction extends Action {
  /* - Private members --------------------------------------------------- */

  private text: string;

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  public managment: Management;
  public value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, 
    management: Management, value: number) {
    // Base constructor
    super(id, ActionType.management);

    this.managment = management;
    this.value = value;

    this.text = "";

    if (management === Management.draw)
    {
        this.text = "Draw ";

        if (value == 1) {
            this.text += "one card"
        }
        else
        {
            this.text += value + " cards"
        }

    }

    if (management === Management.retreat)
    {
        this.text = "Retreat ";

        if (value === 1)
        {
            this.text += "this card";
        }
        else
        {
            this.text += value + " cards";
        }
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
