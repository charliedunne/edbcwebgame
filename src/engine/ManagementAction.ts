import Action  from "./Action";
import { ActionType, Management, Target } from './ActionTypes';

export default class ManagementAction extends Action {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  public managment: Management;
  public value: number;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, 
    management: Management, value: number, secondaryAction?: Action) {
    // Base constructor
    super(id, ActionType.management, secondaryAction);

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

}
