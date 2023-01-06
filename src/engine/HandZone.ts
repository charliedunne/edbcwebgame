import CardBase from "./CardBase";
import GameZone from "./GameZone";

export enum User {
    player,
    enemy
}

export default class HandZone extends GameZone {

    /* Number of cards in the zone */
    cards: CardBase [];

    /* Debug lines */
    debug: boolean;

    constructor(
        scene: Phaser.Scene,
        user: User
    ) {
        let zoneData: number [] = [0, 0, 0, 0];

        if (user == User.player)
        {
            zoneData = [150, 1080, 855, 210];
        }
        else
        {
            zoneData[1] = 0;
        }

        /* Call base constructor */
        let name: string = '';
        if (user == User.player)
        {
            name = "player_hand";
        }
        else
        {
            name = "enemy_hand";
        }

        super(scene, zoneData[0], zoneData[1], zoneData[2], zoneData[3], name);

        /* Create array of cards */
        this.cards = new Array();

        this.debug = true;

        this.setRectangleDropZone(zoneData[2], zoneData[3]).setOrigin(0, 0);

        if (this.debug) {
            let dropZoneOutline = this.scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xFF69b4);
            dropZoneOutline.strokeRect(this.x,
                this.y,
                this.width,
                this.height)
        }
    }

    addCard(card: CardBase) {

        /* How much separation the card will have (could be negative) */
        let cardSeparation = 5;
        let xPos: number = 0;
        let yPos: number = 0;
        const cardSizeX: number = card.getSize().width;
        const cardSizeY: number = card.getSize().height;

        if (this.cards.length == 0)
        {
            xPos = this.x + (cardSizeX/2)*(this.cards.length+1) + 5;
        }
        else /* if (this.cards.length <= 5) */
        {
            xPos = this.cards[this.cards.length-1].x + cardSizeX*.575;
        }
      
        yPos = this.y + cardSizeY/2;

        this.scene.tweens.add({
            targets: card,
            x: xPos,
            y: yPos,
            duration: 300,
            yoyo: false,
            ease: "Power1.inOut",
            repeat: 0
        })

        //card.setPosition(xPos, yPos);
        this.cards.push(card)
    }

}