import Card, { CardBaseVisuals } from "../engine/Card";
import { CardBaseAttr, CardShipAttr } from "./CardBase";

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

    constructor(
        scene: Phaser.Scene,
        baseVisuals: CardBaseVisuals,
        shipAttr: CardShipAttr
    ) {

        // Set-up Data Frame
        this.dataFrame = scene.add.image(0, 0, "card_cd");

        // Set-up Cost
        let costKey = "card_cd_cost_" + shipAttr.karma.toString();
        this.costFrame = scene.add.image(0, 0, costKey);
        this.cost = scene.add
            .bitmapText(
                -425,
                -742,
                "eurostile_bold",
                shipAttr.cost.toString(),
                110
            )
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
            .bitmapText(
                -425,
                -280,
                "eurostile_bold",
                shipAttr.speed.toString(),
                80
            )
            .setOrigin(0.5);

        // Maker - Model - Role
        let modelString =
            shipAttr.builder + " " + shipAttr.model + " - ";

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

    /* Constructor --------------------------------------------------------- */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        faceDown: Boolean = false,
        baseAttr: CardBaseAttr,
        shipAttr: CardShipAttr,
    ) {
        // Call Base Constructor
        super(scene, x, y, faceDown, baseAttr)

        // Save inputs internally
        this.shipAttr = shipAttr;

        // Internal status variables

        // Create Visual elements
        this.shipVisuals = new CardShipVisuals(scene, this.baseVisuals, this.shipAttr);

        // Add elements to container
        this.add(this.shipVisuals.dataFrame);
        this.add(this.shipVisuals.costFrame);
        this.add(this.shipVisuals.cost);
        this.add(this.shipVisuals.strength);
        this.add(this.shipVisuals.speed);
        this.add(this.shipVisuals.model);
        this.add(this.shipVisuals.role);


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

}