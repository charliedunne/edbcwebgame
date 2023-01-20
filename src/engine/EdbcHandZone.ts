import CardBase, { CardSize } from "./CardBase";
import { EdbcZone, Position, ZoneLayout } from "./EdbcZone";

export class EdbcHandZone extends EdbcZone {

    /* Hand hidden flag */
    isHidden: boolean
    absYpos: number

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

        // Initialize Hidden status
        this.isHidden = true

        // Initialize Absolute Y position
        this.absYpos = this.positions[0].y

        this.showHand()
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
                        (cardSize.width / 2) * i;

                    position.y = this.y + (cardSize.height / 2) + 25;

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
     * Show the hand
     */
    showHand() {

        if (this.isHidden) {

            for (let i = 0; i < this.positions.length; ++i) {
                // Move the card to the appropriate position
                this.scene.tweens.add({
                    targets: this.cards[i],
                    y: this.absYpos - 100,
                    duration: 100,
                    yoyo: false,
                    ease: "Power1.inOut",
                    repeat: 0
                })

                this.positions[i].y = this.absYpos - 100
            }

            this.isHidden = false
        }
    }

    /**
     * Hide the hand
     */
    hideHand() {

        if (!this.isHidden) {

            for (let i = 0; i < this.positions.length; ++i) {
                // Move the card to the appropriate position
                this.scene.tweens.add({
                    targets: this.cards[i],
                    y: this.absYpos,
                    duration: 100,
                    yoyo: false,
                    ease: "Power1.inOut",
                    repeat: 0
                })

                this.positions[i].y = this.absYpos
            }

            this.isHidden = true
        }

    }
}