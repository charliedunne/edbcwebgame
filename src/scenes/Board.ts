import { edbc_preload } from "./AssetsPreload";
import CardBase from "../engine/CardBase";
import { CardType, CardFaction, CardSet, ShipRole } from "../engine/CardBase";
import Deck from "../engine/Deck";
import GameZone from "../engine/GameZone";
import HandZone from "../engine/HandZone";
import { User } from "../engine/HandZone";

export default class Board extends Phaser.Scene {

    cards: CardBase[];

    constructor() {
        super("Elite Dangerous Battle Cards");

        this.cards = new Array();
    }

    preload() {
        /* EDBC Preaload Assets */
        edbc_preload(this);
    }

    handleEvents() {
        this.input.mouse.disableContextMenu();


        /*        
       
               this.input.on(
                   "gameobjectover",
                   function (pointer: Phaser.Input.Pointer, object: CardBase) {
                       object.hover();
       
                   }, this
               );
       
               this.input.on(
                   "gameobjectout",
                   function (pointer: Phaser.Input.Pointer, object: CardBase) {
                       object.unhover();
                   }, this
               );
       
       
               this.input.on(
                   "gameobjectdown",
                   function (pointer, object: CardBase) {
                       object.clickDown()
                   },
                   this
               );
       
               this.input.on(
                   "gameobjectup",
                   function (pointer: Phaser.Input.Pointer, object: CardBase) {
                       if (pointer.rightButtonReleased()) {
                           object.flip();
                       } else {
                           console.log("right button");
                           object.clickUp();
                       }
                   },
                   this
               );
       
               this.input.on(
                   "drag",
                   function (pointer, object: CardBase, dragX, dragY) {
                       object.x = dragX;
                       object.y = dragY;
                       object.drag(dragX, dragY);
                   },
                   this
               );
       */
        this.input.on(
            "dragend",
            function (pointer: Phaser.Input.Pointer, object: CardBase, dropped:Boolean) {
                if (!dropped) {
                    object.move(object.input.dragStartX, object.input.dragStartY);
                }
            }, this
        );

        this.input.on('drop', function (pointer: Phaser.Input.Pointer, gameObject: CardBase, dropZone: GameZone) {
            dropZone.addCard(gameObject);
            gameObject.updateZone(dropZone);
        }, this);
    }

    create() {


        /* Create Background */
        this.add.image(0, 0, "background").setOrigin(0);
        this.add.image(0, 0, "areas_layer").setOrigin(0);

        const side_x: number = 140;
        const side_y: number = 200;

        /*         let card = new CardBase(
                    this,
                    130,
                    760,
                    {
                        id: 1,
                        set: CardSet.core,
                        title: "Orca Delta",
                        type: CardType.ship,
                        faction: CardFaction.federation,
                    },
                    {
                        cost: 5,
                        karma: 0,
                        strength: 4,
                        speed: 30,
                        builder: "saud kruger",
                        model: "orca",
                        role: [ShipRole.liner],
                    }
                );
        
                card.setScale(0.1);
        
                let card2 = new CardBase(
                    this,
                    130 + side_x,
                    760,
                    {
                        id: 2,
                        set: CardSet.core,
                        title: "Adder Cornucopia",
                        type: CardType.ship,
                        faction: CardFaction.alliance,
                    },
                    {
                        cost: 4,
                        karma: 1,
                        strength: 3,
                        speed: 60,
                        builder: "Falcon delacy",
                        model: "Krait MkII",
                        role: [ShipRole.multipurpose],
                    }
                );
        
                card2.setScale(0.1);
        
                let card3 = new CardBase(
                    this,
                    130 + 2 * side_x,
                    760,
                    {
                        id: 3,
                        set: CardSet.core,
                        title: "Cutty Imperial",
                        type: CardType.ship,
                        faction: CardFaction.empire,
                    },
                    {
                        cost: 9,
                        karma: 2,
                        strength: 8,
                        speed: 50,
                        builder: "Imperial Strike",
                        model: "Imperial Cutter",
                        role: [ShipRole.figher, ShipRole.warship],
                    }
                );
        
                card3.setScale(0.1);
        
                let card4 = new CardBase(
                    this,
                    130 + 3 * side_x,
                    760,
                    {
                        id: 4,
                        set: CardSet.core,
                        title: "Enegize shields",
                        type: CardType.outfitting,
                        faction: CardFaction.neutral,
                    },
                    { cost: 9, karma: 2 }
                );
        
                card4.setScale(0.1);
        
                let card5 = new CardBase(
                    this,
                    130,
                    760 + side_y,
                    {
                        id: 5,
                        set: CardSet.core,
                        title: "WTF",
                        type: CardType.action,
                        faction: CardFaction.neutral,
                    },
                    {}
                );
        
                card5.setScale(0.1);
        
                let card6 = new CardBase(
                    this,
                    130 + side_x,
                    760 + side_y,
                    {
                        id: 6,
                        set: CardSet.core,
                        title: "Fuel Rats",
                        type: CardType.ship,
                        faction: CardFaction.neutral,
                    },
                    {
                        cost: 2,
                        karma: 1,
                        strength: 2,
                        speed: 80,
                        builder: "Lakon",
                        model: "Type 6",
                        role: [ShipRole.transport],
                    }
                );
        
                card6.setScale(0.1);
        
                let card7 = new CardBase(
                    this,
                    130 + 2 * side_x,
                    760 + side_y,
                    {
                        id: 7,
                        set: CardSet.core,
                        title: "KillBlade",
                        type: CardType.ship,
                        faction: CardFaction.empire,
                    },
                    {
                        cost: 7,
                        karma: 2,
                        strength: 5,
                        speed: 50,
                        builder: "Zorgon Peterson",
                        model: "Fer-de-lance",
                        role: [ShipRole.bountyHunter],
                    }
                );
        
                card7.setScale(0.1);
        
                let card8 = new CardBase(
                    this,
                    130 + 3 * side_x,
                    760 + side_y,
                    {
                        id: 8,
                        set: CardSet.core,
                        title: "Diamondback flux",
                        type: CardType.ship,
                        faction: CardFaction.federation,
                    },
                    {
                        cost: 5,
                        karma: 0,
                        strength: 4,
                        speed: 40,
                        builder: "Lakon",
                        model: "Diamondback Scout",
                        role: [ShipRole.figher, ShipRole.explorer],
                    }
                );
        
                card8.setScale(0.1);
         */
        for (let i = 9; i < 20; ++i) {
            let tempCard = new CardBase(
                this,
                800,
                600,
                {
                    id: i,
                    set: CardSet.core,
                    title: "Diamondback flux",
                    type: CardType.ship,
                    faction: CardFaction.federation,
                },
                {
                    cost: 5,
                    karma: 0,
                    strength: 4,
                    speed: 40,
                    builder: "Lakon",
                    model: "Diamondback Scout",
                    role: [ShipRole.figher, ShipRole.explorer],
                }
            ).setScale(0.1);

            this.cards.push(tempCard);
        }

        /*          this.cards.push(card);
                this.cards.push(card2);
                this.cards.push(card3);
                this.cards.push(card4);
                this.cards.push(card5);
                this.cards.push(card6);
                this.cards.push(card7);
                this.cards.push(card8);  */


        this.input.mouse.disableContextMenu();





        /*         let deck = new Deck(this);
        
                deck.pushCard(card);
                deck.pushCard(card2);
                deck.pushCard(card3);
                deck.pushCard(card4);
                deck.pushCard(card5);
                deck.pushCard(card6);
                deck.pushCard(card7);
                deck.pushCard(card8);
        
                console.log("deck :" + deck.getLength());
        
                for (let i = 0; i < deck.getLength(); ++i) {
                    console.log(deck.getCardById(i).getBaseAttr().id);
                }
        
                deck.shuffleDeck()
               
                console.log("deck again:");
                for (let i = 0; i < deck.getLength(); ++i) {
                    console.log(deck.getCardById(i).getBaseAttr().id);
                }
        
                deck.shuffleDeck()
        
                const mycard = deck.popCard();
                console.log("Last:")
               
                for (let i = 0; i < deck.getLength(); ++i) {
                    console.log(deck.getCardById(i).getBaseAttr().id);
                } */

        let dropZone = new GameZone(this, 42, 100, 595, 498, "enemy_left");

        let playerHand = new HandZone(this, User.player);

        this.handleEvents()
    }

    update() {


    }
}
