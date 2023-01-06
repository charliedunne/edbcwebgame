import CardBase from "./CardBase";
import { EdbcZone, Position } from "./EdbcZone";

export class EdbcGameZone extends EdbcZone {

    /**
     * Constructor
     * 
     * @param scene Scene we are working with
     * @param x Initial X position of the zone
     * @param y Initial Y position of the zone
     * @param width Initial WIDTH of the zone
     * @param height Initial HEIGHT of the zone
     * @param name Name of the zone
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        name: string
    ) {
        // Call Base constructor
        super(scene, x, y, width, height, name)
    }

    /**
     * Implementation of abstract method.
     * 
     * Calculate the appropriate position of the new card to insert in the zone
     * 
     * @param card Card to be added (include to check the dimensions)
     * @return Position Position to place the new card
     */
    calculateNextCardPosition(card: CardBase): Position {

        // Position to calculate
        let position: Position = {x: 0, y: 0, depth: 0}

        // Compute Position
        position.x = this.x + ((card.getSize().width / 2) + 15) +
        (card.getSize().width + 5) * (this.cards.length % 4);
   
        position.y = this.y + (card.getSize().height / 2) + 25;

        if (this.cards.length >= 4) {
            position.y = position.y + card.getSize().height + 15;
        }

        return position
    }

    rearrangeCards(): void {
        
    }
}