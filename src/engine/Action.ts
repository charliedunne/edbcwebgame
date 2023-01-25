import { ActionType } from "./ActionTypes";

export default abstract class Action {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  text: string;

  id: number;
  type: ActionType;
  secondaryAction?: Action;

  /* - Public members ---------------------------------------------------- */

  /* None */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, type: ActionType, secondaryAction?: Action) {
    // Fill internal members
    this.id = id;
    this.type = type;
    this.text = "";

    this.secondaryAction = secondaryAction;
  }

  /* Getters ------------------------------------------------------------- */

  /* None */

  /* Setters ------------------------------------------------------------- */

  /* None */

  /* Private interface --------------------------------------------------- */

  parseLongString(text: string): string {
    let outText: string = text;

    if (text.length > 35) {
      let firstSpace: number = text.indexOf(" ", 35);
      let firstPart: string = text.substring(0, firstSpace);
      let secondPart: string = text.substring(firstSpace + 1, text.length);

      outText = firstPart + "\n" + secondPart;
    }

    return outText;
  }

  /* Protected interface ------------------------------------------------- */

  /* None */

  /* Public interface ---------------------------------------------------- */

  abstract run(): void;

  /**
   * This function shall return the text to be printed in the card for
   * each action
   * @returns String to print on the card
   */
  toString(): string {
    
    let text: string = this.text;

    // Add the second acction
    if (this.secondaryAction !== undefined) {
      text += " AND " + this.secondaryAction.toString();
    }

    return text;
  }
}
