
// Import card types
import CardBase from './CardBase';
import {
    CardType,
    CardSize,
    CardZoomStatus,
    CardSet,
    CardFaction,
    CardColor,
    CardBaseAttr,
    CardShipAttr
} from './CardTypes';


/* Private functions */

/* Private classes */
class CardVisuals {
    bg: string = "bg_none";
    set: string = "set_none";
    art: string = "no_art";

    constructor(
        type: CardType,
        faction: CardFaction, 
        set: CardSet, 
        art?: string) {
        this.bg = "bg_" + type;

        if (type != CardType.outfitting) {
            this.bg = this.bg + "_" + faction;
        }


        this.set = set.toString();

        if (art !== undefined) {
            this.art = art;
        }

    }
}


export default class Card extends Phaser.GameObjects.Container {

    /* - Private members --------------------------------------------------- */

    /* - Public members ---------------------------------------------------- */
    
    // Scene
    scene: Phaser.Scene;

    // Coordinates
    x: number;
    y: number;

    // Card Data
    baseAttr: CardBaseAttr;

    // Card Visuals
    visuals: CardVisuals;

    /* - Protected members ------------------------------------------------- */


    /* Constructor --------------------------------------------------------- */
    constructor (
        scene: Phaser.Scene,
        x: number,
        y: number,
        baseAttr: CardBaseAttr
    ) {
        // Call Base Constructor
        super(scene, x, y)

        // Save inputs internally
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.baseAttr = baseAttr;

        // Create Visual elements
        this.createVisuals()
    }

    /* Getters ------------------------------------------------------------- */


    /* Setters ------------------------------------------------------------- */


    /* Public interface ---------------------------------------------------- */

    flip() {}

    move() {}

    /* Private interface --------------------------------------------------- */

    private createVisuals() {

    }

}