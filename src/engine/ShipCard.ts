import Card, { CardBaseVisuals } from "../engine/Card";
import { CardBaseAttr, CardShipAttr } from "./CardBase";
import Action, { ActionType } from "./Action";

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

  constructor(
    scene: Phaser.Scene,
    baseVisuals: CardBaseVisuals,
    shipAttr: CardShipAttr,
    actions: Action[]
  ) {
    // Initialize
    this.actions = [];
    this.actionsIco = [];

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
    console.log(actions.length);
    for (let i = 0; i < actions.length; ++i) {
      let actionYpos = this.role.y + this.role.height + 40 + 50 * i;

      // Select the action ICON
      let icon = "";

      if (actions[i].type === ActionType.attack) {
        icon = "ico_action_attack";
      } else if (actions[i].type === ActionType.defense) {
        icon = "ico_action_defense";
      } else if (actions[i].type === ActionType.task) {
        icon = "ico_action_task";
      } else if (actions[i].type === ActionType.card) {
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
            actions[i].toString().toUpperCase(),
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

  /* Constructor --------------------------------------------------------- */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    faceDown: Boolean = false,
    baseAttr: CardBaseAttr,
    shipAttr: CardShipAttr,
    shipActions: Action[]
  ) {
    // Call Base Constructor
    super(scene, x, y, faceDown, baseAttr);

    // Save inputs internally
    this.shipAttr = shipAttr;
    this.shipActions = shipActions;

    // Internal status variables

    // Create Visual elements
    this.shipVisuals = new CardShipVisuals(
      scene,
      this.baseVisuals,
      this.shipAttr,
      shipActions
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
