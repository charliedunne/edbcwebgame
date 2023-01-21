import Card from "../engine/Card";
import { CardBaseAttr, CardShipAttr } from "./CardBase";

/* Private classes */
class CardShipVisuals {

    /* Ship Technical Data */
    dataFrame: Phaser.GameObjects.Image;    
    costFrame: Phaser.GameObjects.Image;
    cost: Phaser.GameObjects.BitmapText;
    strength: Phaser.GameObjects.BitmapText;
    speed: Phaser.GameObjects.BitmapText;

    constructor(
        scene: Phaser.Scene,
        cost: number,
        karma: number,
        strenght: number,
        speed: number
    ) {

        // Set-up Data Frame
        this.dataFrame = scene.add.image(0, 0, "card_cd");

        // Set-up Cost
        let costKey = "card_cd_cost_" + karma.toString();
        this.costFrame = scene.add.image(0, 0, costKey);

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
        baseAttr: CardBaseAttr,
        shipAttr: CardShipAttr,
    ) {
        // Call Base Constructor
        super(scene, x, y, baseAttr)

        // Save inputs internally
        this.shipAttr = shipAttr;

        // Internal status variables

        // Create Visual elements
        this.shipVisuals = new CardShipVisuals(scene,
            shipAttr.cost, shipAttr.karma, shipAttr.strength, shipAttr.speed);

        // Add elements to container
        this.add(this.shipVisuals.dataFrame);
        this.add(this.shipVisuals.costFrame);

    }

    /* Getters ------------------------------------------------------------- */


    /* Setters ------------------------------------------------------------- */


    /* Public interface ---------------------------------------------------- */

    /* Protected interface ------------------------------------------------- */

    /* Private interface --------------------------------------------------- */

}