import CardBase from "./CardBase";

/**
 * Position type
 */
export interface Position
{
    x: number
    y: number
    depth: number
}

interface Size
{
    width: number
    height: number
}

/**
 * Hand movements speed
 */
const _handSpeed_:number = 100

export abstract class EdbcZone extends Phaser.GameObjects.Zone {

    /* Cards avaialbe in zone */
    protected cards: CardBase[]

    /* Cards position */
    protected positions: Position[]

    /* Debug lines */
    private debug: boolean

    /* Zone name */
    private zoneName: string

    /* Card size */
    protected cardSize: Size

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

        // Default card size
        this.cardSize = {width: 0, height: 0}

        // Initialize the cards array
        this.cards = []
        this.positions = []
    }

    /**
     * Calculate the absolute position of next card
     * 
     * @param card Card to be added (include to check the dimensions)
     * @return Position Position of the new card
     */
    abstract calculateNextCardPosition(card: CardBase): Position

    /**
     * Rearrange the current cards in position. 
     * This function will only update the 'positions' array
     */
    abstract rearrangeCards(): void

    /**
     * Add a new card to the zone
     * 
     * @param card card to add
     * @return ErrCode
     */
    addCard(card: CardBase) {

        // Calculate position of next card
        let position: Position = this.calculateNextCardPosition(card);

        // Add card to the cards array an positions array
        this.cards.push(card);
        this.positions.push(position);

        // Move the card to the appropriate position
        this.scene.tweens.add({
            targets: card,
            x: position.x,
            y: position.y,
            depth: position.depth,
            duration: _handSpeed_,
            yoyo: false,
            ease: "Power1.inOut",
            repeat: 0
        })

        // Update card size
        /** @todo this should be a constant somehow */
        this.cardSize = {width: card.getSize()[0], height: card.getSize()[1]}
    }

    /**
     * Remove specific card from the Zone
     * @param card 
     */
    removeCard(card: CardBase) {

        // Index of the card in the local array
        let index:number = -1

        for (let i = 0; i < this.cards.length; ++i) {
            if (this.cards[i].baseAttr.id === card.baseAttr.id) {
                index = i;
                break;
            }
        }

        // Stop execution if the index is not found
        if (index === -1)
        {
            throw new Error('Card [' + card.baseAttr.id + '] not found')
        }

        console.log('remove card index: ' + index)

        // Remove card from array
        this.cards.splice(index, 1)
        this.positions.splice(index, 1)

        // Rearrange the rest of the cards
        this.rearrangeCards()

        for (let i = 0; i < this.cards.length; ++i)
        {
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