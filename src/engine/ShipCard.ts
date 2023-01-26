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
  actions: Phaser.GameObjects.Container[];
  abilities: Phaser.GameObjects.Container[];

  constructor(
    scene: Phaser.Scene,
    baseVisuals: CardBaseVisuals,
    shipAttr: CardShipAttr,
    actions: Action[],
    abilities?: Ability[],
  ) {
    // Initialize
    this.actions = [];
    this.abilities = [];

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
    let actionXpos: number = -560 + 40;

    for (let i = 0; i < actions.length; ++i) {

      if (i > 0) {
        console.log(this.actions[i - 1].height)
        actionYpos = actionYpos + ((this.actions[i - 1].height + 10));
      }

      this.actions.push(this.assembleActionContainer(scene, actionXpos, actionYpos, actions[i]));
    }

    // Abilities
    if (abilities !== undefined) {

      let abilityYpos: number =
        this.actions[this.actions.length - 1].y +
        this.actions[this.actions.length - 1].height + 40;

      let abilityXpos: number = -560 + 40;

      for (let i = 0; i < abilities.length; ++i) {

        // Update the Ypos
        if (i > 0) {
          abilityYpos = abilityYpos + ((this.abilities[i - 1].height + 10));
        }

        this.abilities.push(this.assembleAbilityContainer(scene, abilityXpos, abilityYpos, abilities[i]));
      }
    }
  }

  /* Private interface --------------------------------------------------- */

  /**
   * Split text into different lines if the width of it is too much.
   * @param text string to trim
   * @param maxSize maximum size (in characters) to support
   * @returns 
   */
  private parseLongStringForActions(text: string, maxSize: number): string {

    let outText: string = text;

    if (text.length > maxSize) {
      let firstSpace: number = text.indexOf(' ', maxSize);
      let firstPart: string = text.substring(0, firstSpace);
      let secondPart: string = text.substring(firstSpace + 1, text.length);

      outText = firstPart + "\n" + secondPart;
    }

    return outText;
  }

  private splitActionString(text: string): string[] {
    return text.split(":", 2);
  }

  private assembleActionContainer(
    scene: Phaser.Scene, xPos: number, yPos: number, action: Action): Phaser.GameObjects.Container {

    // Container to return
    let container: Phaser.GameObjects.Container = new Phaser.GameObjects.Container(scene, xPos, yPos);

    // Select the action ICON
    let iconImage = "";

    if (action.type === ActionType.attack) {
      iconImage = "ico_action_attack";
    } else if (action.type === ActionType.defense) {
      iconImage = "ico_action_defense";
    } else if (action.type === ActionType.task) {
      iconImage = "ico_action_task";
    } else if (action.type === ActionType.management) {
      iconImage = "ico_action_card";
    }

    let actionText: string[] = action
      .toString()
      .toUpperCase()
      .split(":", 2);


    let icon: Phaser.GameObjects.Image = scene.add
      .image(0, 0, iconImage)
      .setOrigin(0.5)
      .setScale(0.8)

    let text: Phaser.GameObjects.BitmapText = scene.add
      .bitmapText(
        icon.x + icon.width / 2,
        0,
        "eurostile",
        this.parseLongStringForActions(actionText[0], 25),
        45
      )
      .setOrigin(0, 0.5)
      .setTint(0xff9900);

    container.add(icon);
    container.add(text);

    // Update the container dimensions
    container.width = icon.width + text.width;
    container.height = text.height;

    if (action.type === ActionType.attack) {

      let secondText: Phaser.GameObjects.BitmapText = scene.add
        .bitmapText(
          text.x + text.width,
          0,
          "eurostile_bold",
          ": " + actionText[1],
          45
        )
        .setOrigin(0, 0.5)
        .setTint(0xff9900);

      container.add(secondText);

      // Add size to the contianer width (in cse of second text part)
      container.width += secondText.width;
    }

    return container;
  }

  private assembleAbilityContainer(
    scene: Phaser.Scene, xPos: number, yPos: number, ability: Ability): Phaser.GameObjects.Container {

    // Container to return
    let container: Phaser.GameObjects.Container = new Phaser.GameObjects.Container(scene, xPos, yPos);

    // Select the action ICON
    let iconImage = "ico_ability";

    let icon: Phaser.GameObjects.Image = scene.add
      .image(0, 0, iconImage)
      .setOrigin(0.5)
      .setScale(0.8)

    container.add(icon);
    container.width = icon.width;

    let abilityText: string[] = ability
      .toString()
      .toUpperCase()
      .split(":", 2);

    console.log("ability: " + abilityText.length + ". -> " + abilityText)

    if (abilityText.length == 1) {

      let abilityString: Phaser.GameObjects.BitmapText = scene.add
        .bitmapText(
          icon.x + icon.width / 2,
          0,
          "eurostile_bold",
          this.parseLongStringForActions(abilityText[0], 35),
          45
        )
        .setOrigin(0, 0.5)
        .setTint(0x4499ff);

      container.add(abilityString);

      // Update the container dimensions
      container.width += abilityString.width;
      container.height = abilityString.height;
      
    }
    else
    {
      let karmaCost: Phaser.GameObjects.BitmapText = scene.add
        .bitmapText(
          icon.x + icon.width / 2,
          0,
          "eurostile",
          abilityText[0],
          45
        )
        .setOrigin(0, 0.5)
        .setTint(0x4499ff);

      container.add(karmaCost);

      let abilityString: Phaser.GameObjects.BitmapText = scene.add
        .bitmapText(
          karmaCost.x + karmaCost.width,
          0,
          "eurostile_bold",
          ": " + abilityText[1],
          45
        )
        .setOrigin(0, 0.5)
        .setTint(0x4499ff);

      container.add(abilityString);

      // Update the container dimensions
      container.width += karmaCost.width + abilityString.width;
      container.height = abilityString.height;
    }

    return container;
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
      this.add(this.shipVisuals.actions[i]);
    }

    for (let i = 0; i < this.shipVisuals.abilities.length; ++i) {
      this.add(this.shipVisuals.abilities[i])
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




}
