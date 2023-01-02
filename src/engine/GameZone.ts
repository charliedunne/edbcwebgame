import CardBase from "./CardBase";

export default class GameZone extends Phaser.GameObjects.Zone {

    /* Scene */
    //scene: Phaser.Scene;

    /* Number of cards in the zone */
    cards: number;

    /* Debug lines */
    debug: boolean;

    /* Zone name */
    name: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        name: string
    ) {
        super(scene, x, y, width, height);

        /* Set the zone name */
        this.name = name;

        this.debug = false;

        this.setRectangleDropZone(width, height).setOrigin(0, 0);

        if (this.debug) {
            let dropZoneOutline = this.scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xFF69b4);
            dropZoneOutline.strokeRect(this.x,
                this.y,
                this.width,
                this.height)
        }

        /* Initialize cards number */
        this.cards = 0;
    }

    addCard(card: CardBase) {
        let xPos: number = this.x + ((card.getSize()[0] / 2) + 15) +
            (card.getSize()[0] + 5) * (this.cards % 4);
        let yPos: number = this.y + (card.getSize()[1] / 2) + 25;

        if (this.cards >= 4)
        {
            yPos = yPos + card.getSize()[1] + 15;
        }

        this.scene.tweens.add({
            targets: card,
            x: xPos,
            y: yPos,
            duration: 100,
            yoyo: false,
            ease: "Power1.inOut",
            repeat: 0
        })

        //card.setPosition(xPos, yPos);
        this.cards++;
    }

    removeCard() {
        this.cards--;
        console.log("Zone cards: " + this.cards);
    }

    getName() {
        return this.name;
    }
}