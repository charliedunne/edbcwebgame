import CardBase, { CardSize } from "./CardBase";
import { EdbcZone, Position, ZoneLayout } from "./EdbcZone";

export class EdbcHandZone extends EdbcZone {

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
        name: string,
        cardSize: CardSize,
        layout: ZoneLayout
    ) {
        // Call Base constructor
        super(scene, x, y, width, height, name, cardSize, layout)
    }

    /**
     * This abstract function is defined for every kind of zone and define
     * the geometry of the Zone, It shall set the position of every single
     * card included in the zone at initialization.
     * 
     * @param cardSize Size of the card (in px) inside the zone
     * @param layout Definition of the zone geometry, it will define the
     * number of rows and columns, note that if the number specified is 0
     * it means that there is no limit in the number or cards and the 
     * position will be updated dynamically
     */
    setCardsPositions(cardSize: CardSize, layout: ZoneLayout): void {

        if (layout.columns > 0 && layout.rows > 0) {

            // Set Depth
            let depth: number = 0

            for (let j = 0; j < layout.rows; ++j) {
                for (let i = 0; i < layout.columns; ++i) {

                    // Position to calculate
                    let position: Position = { x: 0, y: 0, depth: 0 }

                    // Compute Position
                    position.x = this.x + ((cardSize.width / 2) + 15) +
                        (cardSize.width/2) * i;

                    position.y = this.y + (cardSize.height / 2) + 25 + cardSize.height * j;

                    // Set depth
                    position.depth = depth++

                    // Add computed position to the internal array
                    this.positions.push(position)
                }
            }
        }
        else {
            /** @todo To be designed */
            throw Error('Functionality not implemented yet')
        }
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
        let position: Position = { x: 0, y: 0, depth: 0 }

        // Compute Position
        position.x = this.x + ((card.getSize().width / 2) + 15) +
            (card.getSize().width + 5) * (this.cards.length % 4);

        position.y = this.y + (card.getSize().height / 2) + 25;

        if (this.cards.length >= 4) {
            position.y = position.y + card.getSize().height + 15;
        }

        return position
    }
}