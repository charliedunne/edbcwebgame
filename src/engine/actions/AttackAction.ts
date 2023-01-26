import Action from "./Action";
import { Target, ActionType } from "./ActionTypes";
import Card from "./Card";
import { CardFaction, ShipRole } from "./CardTypes";

export enum AttackType {
  fixed = "fixed",
  burst = "burst",
}

export class Attack {
  public type: AttackType;
  public damage: number;

  constructor(type: AttackType, damage: number) {
    this.type = type;
    this.damage = damage;
  }
}

export default class AttackAction extends Action {
  /* - Private members --------------------------------------------------- */

  private quantityString: string;
  private targetString: string;
  private factionString: string;
  private attackTypeString: string;

  /* - Protected members ------------------------------------------------- */

  attackList: Attack[];

  /* - Public members ---------------------------------------------------- */

  /* None */

  /* - Constructor ------------------------------------------------------- */

  constructor(
    id: number,
    target: Target,
    attackList: Attack[],
    secondaryAction?: Action
  ) {
    // Call Base constructor
    super(id, ActionType.attack, secondaryAction);

    this.attackList = attackList;

    this.quantityString = "";
    this.targetString = "target";
    this.factionString = "";
    this.attackTypeString = "";

    if (target.number !== undefined) {
      if (target.number === 1) {
        this.quantityString = "one";
      } else if (target.number === 2) {
        this.quantityString = "two";
      } else if (target.number === 3) {
        this.quantityString = "three";
      } else {
        this.quantityString = target.number.toString();
      }
    }

    if (target.all) {
      this.quantityString = "all";
    }

    if (target.faction !== undefined) {
      this.factionString = `${target.faction.toString()} `;
    }

    if (target.role !== undefined && target.role.length > 0) {
      this.targetString = "";

      for (let i = 0; i < target.role.length; ++i) {
        this.targetString += (target.role[i] as ShipRole).toString();

        if (i < target.role.length - 1) {
          if (
            (target.number !== undefined && target.number > 1) ||
            target.all !== undefined
          ) {
            this.targetString += "s";
          }

          this.targetString += " or ";
        }
      }
    }

    // Add Plural
    if (
      (target.number !== undefined && target.number > 1) ||
      target.all !== undefined
    ) {
      this.targetString += "s";
    }

    // Add Attack types and damage
    for (let i = 0; i < attackList.length; ++i) {
      this.attackTypeString += `${attackList[i].type.toString()} ${attackList[
        i
      ].damage.toString()}`;

      if (i < attackList.length - 1) {
        this.attackTypeString += ", ";
      }
    }

    // Prepare output text
    let targetString: string = `Attack ${this.quantityString} ${this.factionString}${this.targetString}: `;
    let attackString: string = this.attackTypeString;

    this.text = targetString + attackString;

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
