import { AbilityType } from "./AbilityTypes";

export default abstract class Ability {
  /* - Private members --------------------------------------------------- */

  /* - Protected members ------------------------------------------------- */

  title: string;
  desc: string;

  id: number;
  type: AbilityType;
  karmaCost?: number;
  
  /* - Public members ---------------------------------------------------- */

  /* None */

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, type: AbilityType, karmaCost?: number) {
    // Fill internal members
    this.id = id;
    
    this.type = type;

    if (karmaCost !== undefined) {
      this.karmaCost = karmaCost;
      this.title = "Spend " + karmaCost + " karma: "
    }
    else
    {
      this.title = "";
    }

    this.desc = "";
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
    
    return this.title;
  }
}
