import Card, { CardBaseVisuals } from "../engine/Card";
import { CardBaseAttr, CardShipAttr } from "./CardBase";
import Ability from "./abilities/Ability";
import Action from "./actions/Action";
import { ActionType } from './actions/ActionTypes';


/* Private classes */
class CardShipVisuals {
  /* Ship Technical Data */
  dataFrame: Phaser.GameObjects.Image;
  costFrame: Phaser.GameObjects.Image;
  cost: Phaser.GameObjects.BitmapText;
  strength: Phaser.GameObjects.BitmapText;
  speed: Phaser.GameObjects.BitmapText;
  model: Phaser.GameObjects.BitmapText;
  role: Phaser.GameObjects.BitmapText;
  actions: Phaser.GameObjects.BitmapText[];
  actionsIco: Phaser.GameObjects.Image[];
  abilities: Phaser.GameObjects.BitmapText[];
  abilitiesIco: Phaser.GameObjects.Image[];

  constructor(
    scene: Phaser.Scene,
    baseVisuals: CardBaseVisuals,
    shipAttr: CardShipAttr,
    actions: Action[],
    abilities?: Ability[],
  ) {
    // Initialize
    this.actions = [];
    this.actionsIco = [];
    this.abilities = [];
    this.abilitiesIco = [];

    // Set-up Data Frame
    this.dataFrame = scene.add.image(0, 0, "card_cd");

    // Set-up Cost
    let costKey = "card_cd_cost_" + shipAttr.karma.toString();
    this.costFrame = scene.add.image(0, 0, costKey);
    this.cost = scene.add
      .bitmapText(-425, -742, "eurostile_bold", shipAttr.cost.toString(), 110)
      .setOrigin(0.5);

    // Strength
    this.strength = scene.add
      .bitmapText(
        -425,
        -495,
        "eurostile_bold",
        shipAttr.strength.toString(),
        80
      )
      .setOrigin(0.5);

    // Speed
    this.speed = scene.add
      .bitmapText(-425, -280, "eurostile_bold", shipAttr.speed.toString(), 80)
      .setOrigin(0.5);

    // Maker - Model - Role
    let modelString = shipAttr.builder + " " + shipAttr.model + " - ";

    let roleString = shipAttr.role.join(", ");

    this.model = scene.add
      .bitmapText(
        -560,
        baseVisuals.title.y + baseVisuals.title.height + 20,
        "eurostile",
        modelString.toUpperCase(),
        40
      )
      .setOrigin(0, 0);

    this.role = scene.add
      .bitmapText(
        this.model.x + this.model.width,
        baseVisuals.title.y + baseVisuals.title.height + 20,
        "eurostile_bold",
        roleString.toUpperCase(),
        40
      )
      .setOrigin(0, 0);

    // Actions
    let actionYpos: number = this.role.y + this.role.height + 40;

    for (let i = 0; i < actions.length; ++i) {

      if (i > 0) {
        actionYpos = actionYpos + ((this.actions[i - 1].height + 10));
      }

      // Select the action ICON
      let icon = "";

      if (actions[i].type === ActionType.attack) {
        icon = "ico_action_attack";
      } else if (actions[i].type === ActionType.defense) {
        icon = "ico_action_defense";
      } else if (actions[i].type === ActionType.task) {
        icon = "ico_action_task";
      } else if (actions[i].type === ActionType.management) {
        icon = "ico_action_card";
      }

      /*       let actionText: string[] = actions[i]
        .toString()
        .toUpperCase()
        .split(":", 2);
 */
      this.actions.push(
        scene.add
          .bitmapText(
            -560 + 80,
            actionYpos,
            "eurostile",
            this.parseLongStringForActions(actions[i].toString().toUpperCase()),
            45
          )
          .setOrigin(0, 0)
          .setTint(0xff9900)
      );

      this.actionsIco.push(
        scene.add
          .image(-560 + 40, actionYpos + 22.5, icon)
          .setOrigin(0.5)
          .setScale(0.8)
      );
    }

    if (abilities !== undefined) {

      let abilityYpos: number =
        this.actions[this.actions.length - 1].y +
        this.actions[this.actions.length - 1].height + 40;

      for (let i = 0; i < abilities.length; ++i) {

        // Update the Ypos
        if (i > 0) {
          abilityYpos = abilityYpos + ((this.abilities[i - 1].height + 10));
        }

        // Set Icon
        let icon = "ico_ability";

        this.abilities.push(
          scene.add
            .bitmapText(
              -560 + 80,
              abilityYpos,
              "eurostile",
              this.parseLongStringForActions(abilities[i].toString().toUpperCase()),
              45
            )
            .setOrigin(0, 0)
            .setTint(0x4499ff)
        );

        this.abilitiesIco.push(
          scene.add
            .image(-560 + 40, abilityYpos + 22.5, icon)
            .setOrigin(0.5)
            .setScale(0.8)
        );
      }
    }
  }



  /* Private interface --------------------------------------------------- */

  parseLongStringForActions(text: string): string {

    let outText: string = text;

    if (text.length > 35) {
      let firstSpace: number = text.indexOf(' ', 35);
      let firstPart: string = text.substring(0, firstSpace);
      let secondPart: string = text.substring(firstSpace + 1, text.length);

      outText = firstPart + "\n" + secondPart;
    }

    return outText;
  }

}

export default class ShipCard extends Card {
  /* - Private members --------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  // Card Data
  shipAttr: CardShipAttr;

  /* - Protected members ------------------------------------------------- */

  // Ship Card Visuals
  shipVisuals: CardShipVisuals;

  // Ship Actions
  shipActions: Action[];

  // Ship Abilities (optional)
  shipAbilities?: Ability[];

  /* Constructor --------------------------------------------------------- */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    faceDown: Boolean = false,
    baseAttr: CardBaseAttr,
    shipAttr: CardShipAttr,
    shipActions: Action[],
    shipAbilities?: Ability[]
  ) {
    // Call Base Constructor
    super(scene, x, y, faceDown, baseAttr);

    // Save inputs internally
    this.shipAttr = shipAttr;
    this.shipActions = shipActions;

    if (shipAbilities !== undefined) {
      this.shipAbilities = shipAbilities;
    }


    // Internal status variables

    // Create Visual elements
    this.shipVisuals = new CardShipVisuals(
      scene,
      this.baseVisuals,
      this.shipAttr,
      shipActions,
      shipAbilities
    );

    // Add elements to container
    this.add(this.shipVisuals.dataFrame);
    this.add(this.shipVisuals.costFrame);
    this.add(this.shipVisuals.cost);
    this.add(this.shipVisuals.strength);
    this.add(this.shipVisuals.speed);
    this.add(this.shipVisuals.model);
    this.add(this.shipVisuals.role);
    for (let i = 0; i < this.shipVisuals.actions.length; ++i) {
      this.add(this.shipVisuals.actionsIco[i]);
      this.add(this.shipVisuals.actions[i]);
    }

    for (let i = 0; i < this.shipVisuals.abilities.length; ++i) {
      this.add(this.shipVisuals.abilitiesIco[i]);
      this.add(this.shipVisuals.abilities[i]);
    }


    // Set the face Down appropriatelly if it is set in initialization
    if (this.faceDown) {
      this.showBack();
    }
  }

  /* Getters ------------------------------------------------------------- */

  /* Setters ------------------------------------------------------------- */

  /* Public interface ---------------------------------------------------- */

  /* Protected interface ------------------------------------------------- */

  /* Private interface --------------------------------------------------- */

  splitActionString(text: string): string[] {
    return text.split(":", 2);
  }


}
