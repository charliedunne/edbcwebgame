import CardBase from "./CardBase";

export default class GameZone extends Phaser.GameObjects.Zone {

    /* Scene */
    //scene: Phaser.Scene;

    /* Cards avaialbe in zone */
    cards: CardBase[];

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
        this.cards = [];
    }

    addCard(card: CardBase) {

        let xPos: number = this.x + ((card.getSize().width / 2) + 15) +
            (card.getSize().width + 5) * (this.cards.length % 4);
        let yPos: number = this.y + (card.getSize().height / 2) + 25;

        if (this.cards.length >= 4) {
            yPos = yPos + card.getSize().height + 15;
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
        this.cards.push(card);
    }

    removeCard(card: CardBase) {

        let index = 999

        for (let i = 0; i < this.cards.length; ++i) {
            if (this.cards[i].baseAttr.id === card.baseAttr.id) {
                index = i;
                break;
            }
        }
        console.log('remove card index: ' + index)

        this.cards.splice(index, 1)

        /* Move all the cards one position left */
        for (let i = index; i < this.cards.length; ++i)
        {
            /** @todo Create abstract function to move card one position left */
        }

        console.log("Zone cards: " + this.cards);
    }

    getName() {
        return this.name;
    }
}