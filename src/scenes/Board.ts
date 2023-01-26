import { edbc_preload } from "./AssetsPreload";
import CardBase, { CardBaseAttr, CardShipAttr, CardZoomStatus } from "../engine/CardBase";
import { CardType, CardFaction, CardSet, ShipRole } from "../engine/CardBase";
import Deck from "../engine/Deck";
import { EdbcGameZone } from "../engine/EdbcGameZone";
import { EdbcHandZone } from "../engine/EdbcHandZone";
import { cardData } from "../data/cardsData"

import Card from "../engine/Card";
import ShipCard from "../engine/ShipCard";
import AttackAction, { AttackType } from "../engine/AttackAction";
import DefenseAction from '../engine/actions/DefenseAction';
import TaskAction from '../engine/TaskAction';
import { Task, Management } from '../engine/ActionTypes';
import ManagementAction from '../engine/actions/ManagementAction';
import Action from '../engine/actions/Action';

export default class Board extends Phaser.Scene {

    deck: Deck;

    constructor() {
        super("Elite Dangerous Battle Cards");

        this.deck = new Deck(-500, 600)
    }

    preload() {
        /* EDBC Preaload Assets */
        edbc_preload(this);
    }

    handleEvents() {
        this.input.mouse.disableContextMenu();

        this.input.on(
            "dragend",
            function (pointer: Phaser.Input.Pointer, object: CardBase, dropped: Boolean) {
                if (!dropped) {
                    object.move(object.input.dragStartX, object.input.dragStartY);
                }
            }, this
        );

        this.input.on('drop', function (pointer: Phaser.Input.Pointer, gameObject: CardBase, dropZone: GameZone) {

            if (gameObject.zoomStatus == CardZoomStatus.default) {
                if (gameObject.getZone() != dropZone) {
                    gameObject.getZone().removeCard(gameObject)
                    dropZone.addCard(gameObject);
                    gameObject.updateZone(dropZone);
                }
                else {
                    gameObject.move(gameObject.input.dragStartX, gameObject.input.dragStartY);
                    dropZone.reasignDepth()
                }
            }

        }, this);
    }

    createMainDeck(deck: Deck) {

        for (let i = 0; i < cardData.length; ++i) {

            let card: CardBase;

            let cardBaseAttr = {
                id: cardData[i].id,
                set: cardData[i].set,
                title: cardData[i].title,
                type: cardData[i].type,
                faction: cardData[i].faction,
                flavor: cardData[i].flavor
            } as CardBaseAttr;

            if (cardBaseAttr.type === CardType.ship || cardBaseAttr.type == CardType.outfitting) {
                let cardShipAttr = {
                    cost: cardData[i].cost,
                    karma: cardData[i].karma,
                    strength: cardData[i].strength,
                    speed: cardData[i].speed,
                    builder: cardData[i].builder,
                    model: cardData[i].model,
                    role: cardData[i].role
                } as CardShipAttr;

                /*                 if (cardBaseAttr.type === CardType.outfitting)
                                { */
                card = new CardBase(this, deck.x, deck.y, cardBaseAttr, cardShipAttr).setScale(0.19);
                deck.pushCard(card);
                /*  } */

            }
            else {
                card = new CardBase(this, deck.x, deck.y, cardBaseAttr).setScale(0.19);
                deck.pushCard(card);
            }


        }

        deck.shuffleDeck();
    }

    create() {

        /* Create Background */
        this.add.image(0, 0, "background").setOrigin(0);
        this.add.image(0, 0, "areas_layer").setOrigin(0);

        const side_x: number = 140;
        const side_y: number = 200;

        this.input.mouse.disableContextMenu();

        /* TEST */
        let card = new Card(this, 1500, 600, undefined,
            {
                id: 1,
                set: CardSet.core,
                title: "My TEST card",
                type: CardType.action,
                faction: CardFaction.federation,
                flavor: "En un lugar de la mancha\nde cuyo nombre no quiero acordarme"
            } as CardBaseAttr).setScale(0.43);

        let action1 = new AttackAction(1,
            { number: 1 },
            [{ type: AttackType.fixed, damage: 3 },
            { type: AttackType.burst, damage: 7 }]);

        let action2 = new AttackAction(1,
            { all: true, role:[ShipRole.multipurpose] },
            [{ type: AttackType.burst, damage: 2 }]);

        let defense1 = new DefenseAction(1, {role:[ShipRole.explorer]}, 1);
        let task1 = new TaskAction(2, Task.scan);
        let task2 = new TaskAction(2, Task.delivery);
        let manage1 = new ManagementAction(3, Management.retreat, 2);
        let doubleaction = new ManagementAction(4, Management.draw, 2, manage1)
        let scanPlanet = new TaskAction(3, Task.scan)
        let doubleaction2 = new AttackAction(2, 
            {number: 1}, [{type: AttackType.fixed, damage: 1}, {type:AttackType.burst, damage: 3}],
            scanPlanet);

        let ship = new ShipCard(this, 600, 600, false,
            {
                id: 2,
                set: CardSet.core,
                title: "Explorer matherfucker\nBravo",
                type: CardType.ship,
                faction: CardFaction.federation,
                flavor: "En un lugar de la mancha\nde cuyo nombre no quiero acordarme"
            } as CardBaseAttr,
            {
                cost: 7,
                karma: 1,
                strength: 8,
                speed: 30,
                builder: "Lakon",
                model: "Diamonback Explorer",
                role: [ShipRole.explorer, ShipRole.fighter]
            } as CardShipAttr,
            [task1, task2, doubleaction2, manage1]).setScale(0.45);


        /* Create main deck */
        this.createMainDeck(this.deck)

        let deckZone = new EdbcGameZone(this, -1000, 300, 200, 210, "deck",
            this.deck.getSize(),
            { rows: 1, columns: 1 })

        let enemyDropZoneLeft = new EdbcGameZone(this, 42, 130, 595, 410, "enemy_left",
            this.deck.getSize(),
            { rows: 2, columns: 4 })

        let enemyDropZoneCenter = new EdbcGameZone(this, 664, 130, 595, 410, "enemy_center",
            this.deck.getSize(),
            { rows: 2, columns: 4 })

        let enemyDropZoneRight = new EdbcGameZone(this, 1284, 130, 595, 410, "enemy_right",
            this.deck.getSize(),
            { rows: 2, columns: 4 })

        let playerDropZoneLeft = new EdbcGameZone(this, 42, 650, 595, 410, "player_left",
            this.deck.getSize(),
            { rows: 2, columns: 4 })

        let playerDropZoneCenter = new EdbcGameZone(this, 664, 650, 595, 410, "player_center",
            this.deck.getSize(),
            { rows: 2, columns: 4 })

        let playerDropZoneRight = new EdbcGameZone(this, 1284, 650, 595, 410, "player_right",
            this.deck.getSize(),
            { rows: 2, columns: 4 })


        let playerHand = new EdbcHandZone(this, 150, 1080, 1000, 210, "player_hand",
            this.deck.getSize(),
            { rows: 1, columns: 10 })
        // let playerHand = new HandZone(this, User.player);


        /** @todo Add buttons */
        let dealCards = this.add.text(1800, 300, ['DEAL'])
            .setFontSize(22)
            .setColor('#ff00ff')
            .setInteractive()

        const customId: number = 43

        let dealCardsByID = this.add.text(1750, 800, [`DEAL_${customId}`])
            .setFontSize(22)
            .setColor('#ff00ff')
            .setInteractive()

        let self = this

        dealCards.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            if (self.deck.getLength() > 0) {
                let card: CardBase = <CardBase>self.deck.popCard()
                playerHand.addCard(card)
                card.updateZone(playerHand);
                card.flip();
            }
        }, this)

        dealCardsByID.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            if (self.deck.getLength() > 0) {
                let card: CardBase = <CardBase>self.deck.popCardById(customId)
                playerHand.addCard(card)
                card.updateZone(playerHand);
                card.flip();
            }
        }, this)

        let hideHand = this.add.text(1800, 400, ['Hide Hand'])
            .setFontSize(22)
            .setColor('#ff00ff')
            .setInteractive()

        hideHand.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            if (self.deck.getLength() > 0) {
                playerHand.hideHand()
            }
        }, this)

        let showHand = this.add.text(1800, 500, ['Show Hand'])
            .setFontSize(22)
            .setColor('#ff00ff')
            .setInteractive()

        showHand.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            if (self.deck.getLength() > 0) {
                playerHand.showHand()
            }
        }, this)

        this.handleEvents()
    }

    update() {

    }
}
