import CardBase, { CardSize } from "./CardBase";

/**
 * Position type
 */
export interface Position {
    x: number
    y: number
    depth: number
}

export interface ZoneLayout {
    rows: number
    columns: number
}

interface Size {
    width: number
    height: number
}



/**
 * Hand movements speed
 */
const _handSpeed_: number = 100

export abstract class EdbcZone extends Phaser.GameObjects.Zone {

    /* Cards avaialbe in zone */
    protected cards: CardBase[]

    /* Cards position */
    protected positions: Position[]

    /* Debug lines */
    private debug: boolean

    /* Zone name */
    private zoneName: string

    /* Card size and Layout */
    protected cardSize: Size
    protected layout: ZoneLayout


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
        super(scene, x, y, width, height)

        // Set zone name
        this.zoneName = name

        // Set debug flag (initially disabled)
        this.debug = true

        // Create the drop zone
        this.setRectangleDropZone(width, height).setOrigin(0, 0);

        // If debug, draw the zone boundaries
        if (this.debug) {
            let dropZoneOutline = this.scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xFF69b4);
            dropZoneOutline.strokeRect(this.x,
                this.y,
                this.width,
                this.height)
        }

        // Set Card size and layout
        this.cardSize = cardSize
        this.layout = layout

        // Initialize the cards array
        this.cards = []
        this.positions = []

        // Set-up the positions
        this.setCardsPositions(cardSize, layout)
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
    abstract setCardsPositions(cardSize: CardSize, layout: ZoneLayout): void

    /**
     * Calculate the absolute position of next card
     * 
     * @param card Card to be added (include to check the dimensions)
     * @return Position Position of the new card
     */
    abstract calculateNextCardPosition(card: CardBase): Position

    /**
     * Add a new card to the zone
     * 
     * @param card card to add
     * @return ErrCode
     */
    addCard(card: CardBase) {

        // Check zone limit
        if (this.cards.length < (this.layout.rows * this.layout.columns)) {

            // Add card to the cards array an positions array
            this.cards.push(card);

            // Move the card to the appropriate position
            this.scene.tweens.add({
                targets: card,
                x: this.positions[this.cards.length - 1].x,
                y: this.positions[this.cards.length - 1].y,
                depth: this.positions[this.cards.length - 1].depth,
                duration: _handSpeed_,
                yoyo: false,
                ease: "Power1.inOut",
                repeat: 0
            })
        }
        else {
            // Exceeded number of cards in zone
            throw Error('Exceeded number of cards in ' + this.zoneName +
                ' Zone. Maximum = ' + (this.layout.rows * this.layout.columns))
        }
    }

    /**
     * Remove specific card from the Zone
     * @param card 
     */
    removeCard(card: CardBase) {

        // Index of the card in the local array
        let index: number = -1

        for (let i = 0; i < this.cards.length; ++i) {
            if (this.cards[i].baseAttr.id === card.baseAttr.id) {
                index = i;
                break;
            }
        }

        // Stop execution if the index is not found
        if (index === -1) {
            throw new Error('Card [' + card.baseAttr.id + '] not found')
        }

        console.log('remove card index: ' + index)

        // Remove card from array
        this.cards.splice(index, 1)

        for (let i = 0; i < this.cards.length; ++i) {
            this.scene.tweens.add({
                targets: this.cards[i],
                x: this.positions[i].x,
                y: this.positions[i].y,
                depth: this.positions[i].depth,
                duration: _handSpeed_,
                yoyo: false,
                ease: "Power1.inOut",
                repeat: 0
            })
        }
    }

    getName() {
        return this.zoneName;
    }
}