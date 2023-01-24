import { EdbcGameZone } from "../engine/EdbcGameZone";

export interface CardSize {
    width: number
    height: number
}

export enum CardType {
    none = "none",
    ship = "ship",
    action = "action",
    outfitting = "outfitting",
    mission = "mission",
    missionSpecific = "mission specific"
}

export enum CardFaction {
    none = "none",
    alliance = "alliance",
    empire = "empire",
    federation = "federation",
    neutral = "neutral",
}

export enum CardSet {
    core = "coriolis",
}

export enum ShipRole {
    fighter = "Fighter",
    warship = "Warship",
    multipurpose = "Multipurpose",
    liner = "Liner",
    miner = "Miner",
    explorer = "Explorer",
    transport = "Transport",
    bountyHunter = "Bounty Hunter",
}

export enum CardZoomStatus {
    default,
    hover,
    click,
}

enum CardColor {
    none = "0xFFFFFF",
    federation = "0xff0a0a",
    empire = "0x21bbff",
    alliance = "0x10ccaa",
    neutral = "0xff8020",
}

export type CardBaseAttr = {
    id: number;
    set: CardSet;
    title: string;
    type: CardType;
    faction: CardFaction;
    flavor: string;
};

export type CardShipAttr = {
    cost: number;
    karma: number;
    strength: number;
    speed: number;
    builder: string;
    model: string;
    role: ShipRole[];
};

const padLeft = (
    number: number,
    length: number,
    character: string = "0"
): string => {
    let result = String(number);
    for (let i = result.length; i < length; ++i) {
        result = character + result;
    }
    return result;
};

class CardVisuals {
    bg: string = "bg_none";
    set: string = "set_none";
    art: string = "no_image";

    constructor(type: CardType, faction: CardFaction, set: CardSet, art?: string) {
        this.bg = "bg_" + type;

        if (type != CardType.outfitting) {
            this.bg = this.bg + "_" + faction;
        }

        this.set = set.toString();
        if (art !== undefined) {
            this.art = art;
        }

    }
}

let cardOrder: number = 0;

export default class CardBase extends Phaser.GameObjects.Container {
    /* --- Private members --- */

    /* Scene */
    scene: Phaser.Scene;

    /* Position */
    xPosOnClick: number;
    yPosOnClick: number;

    /* Depth */
    depthOnClick: number

    /* Dragging flag */
    dragging: Boolean;
    isTrigger: Boolean;

    /* Status */
    zoomStatus: CardZoomStatus;

    /* Zone */
    currentZone: EdbcGameZone;

    /* Background */
    bg: Phaser.GameObjects.Image;
    back: Phaser.GameObjects.Image;
    frameDrained: Phaser.GameObjects.Image;
    art: Phaser.GameObjects.Image;

    /* Faction icon */
    factionIcon: Phaser.GameObjects.Image;

    /* Card ID */
    id: Phaser.GameObjects.BitmapText;

    /* Card Set */
    set: Phaser.GameObjects.Image;

    /* Card Title */
    title: Phaser.GameObjects.BitmapText;

    /* Card Manufacturer, Model and role */
    model?: Phaser.GameObjects.BitmapText;
    role?: Phaser.GameObjects.BitmapText;

    /* Ship Technical Data */
    costFrame?: Phaser.GameObjects.Image;
    dataFrame?: Phaser.GameObjects.Image;
    cost?: Phaser.GameObjects.BitmapText;
    strength?: Phaser.GameObjects.BitmapText;
    speed?: Phaser.GameObjects.BitmapText;

    /* Ship Text flavor */
    flavor?: Phaser.GameObjects.BitmapText;

    /* Card Data */
    baseAttr: CardBaseAttr;
    shipAttr?: CardShipAttr;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        bBaseAttr: CardBaseAttr,
        bShipAttr?: CardShipAttr,
        art?: string
    ) {
        /* Call the Base constructor */
        super(scene, x, y);

        /* Save scene */
        this.scene = scene;

        /* Save initial zone */
        this.currentZone = null

        /* Position */
        this.x = x;
        this.y = y;
        this.xPosOnClick = this.x
        this.yPosOnClick = this.y

        /* Depth */
        this.depth = cardOrder++
        this.depthOnClick = 0;

        /* Dragging flag */
        this.dragging = false;
        this.isTrigger = false;

        /* Reset zoom status */
        this.zoomStatus = CardZoomStatus.default;

        /* Save data */
        this.baseAttr = bBaseAttr;
        this.shipAttr = bShipAttr;


        /* Initialize internal objects */
        /** @todo Initialize phaser object */

        /* -- Set Card Visuals -- */

        /* Chose background */
        let visuals = new CardVisuals(
            bBaseAttr.type,
            bBaseAttr.faction,
            bBaseAttr.set,
            art
        );

        this.bg = scene.add.image(0, 0, visuals.bg);

        /* Art Image */
        if (art === undefined)
        {
            art = 'no_image'
        }

        this.art = scene.add.image(0, 0, visuals.art);

        /* Chose icon */
        if (bBaseAttr.type == CardType.ship) {
            this.factionIcon = scene.add.image(
                510,
                140,
                bBaseAttr.faction.toString()
            );
        } else {
            this.factionIcon = scene.add.image(
                510,
                205,
                bBaseAttr.faction.toString()
            );
        }

        /* Print Card Core Icon */
        this.set = scene.add.image(0, 0, visuals.set);

        /* Print Card ID */
        this.id = scene.add
            .bitmapText(512, 810, "eurostile", padLeft(bBaseAttr.id, 3), 45)
            .setOrigin(0.5, 0.5);
        this.id.setTint(0xd2b679);

        /* Print Title */
        let titleYPosition = 0;
        if (bBaseAttr.type == CardType.ship) {
            titleYPosition = 70;
        } else {
            titleYPosition = 130;
        }

        this.title = scene.add
            .bitmapText(
                -560,
                titleYPosition,
                "eurostile",
                bBaseAttr.title.toUpperCase(),
                85
            )
            .setOrigin(0, 0);
        this.title.setTint(CardColor[bBaseAttr.faction] as number);

        /* Ship model details */
        if (bBaseAttr.type == CardType.ship && this.shipAttr !== undefined) {
            let modelString =
                this.shipAttr.builder + " " + this.shipAttr.model + " - ";
            let roleString = this.shipAttr.role.join(", ");
            this.model = scene.add
                .bitmapText(
                    -560,
                    titleYPosition + this.title.height + 20,
                    "eurostile",
                    modelString.toUpperCase(),
                    40
                )
                .setOrigin(0, 0);
            this.role = scene.add
                .bitmapText(
                    this.model.x + this.model.width,
                    titleYPosition + this.title.height + 20,
                    "eurostile_bold",
                    roleString.toUpperCase(),
                    40
                )
                .setOrigin(0, 0);
        }

        if (bBaseAttr.type == CardType.ship && this.shipAttr !== undefined) {
            if (this.shipAttr.strength !== undefined) {
                this.dataFrame = scene.add.image(0, 0, "card_cd");
            }

            this.strength = scene.add
                .bitmapText(
                    -425,
                    -495,
                    "eurostile_bold",
                    this.shipAttr?.strength.toString(),
                    80
                )
                .setOrigin(0.5);
            this.speed = scene.add
                .bitmapText(
                    -425,
                    -280,
                    "eurostile_bold",
                    this.shipAttr?.speed.toString(),
                    80
                )
                .setOrigin(0.5);
        }

        /* Set cost */
        if (this.shipAttr?.cost !== undefined) {
            let costString = "card_cd_cost_" + this.shipAttr.karma.toString();
            this.costFrame = scene.add.image(0, 0, costString);
            this.cost = scene.add
                .bitmapText(
                    -425,
                    -742,
                    "eurostile_bold",
                    this.shipAttr?.cost.toString(),
                    110
                )
                .setOrigin(0.5);
        }

        /* Set Flavor */
        if (this.baseAttr.flavor.length > 0)
        {
            this.flavor = scene.add
            .bitmapText(
                -550,
                this.bg.height/2 - 125,
                "eurostile",
                this.baseAttr.flavor.toString(),
                49
            )
            .setOrigin(0, 1);
        }

        /* Create Card Back */
        this.back = scene.add.image(0, 0, "card_back");

        /* Frames */
        this.frameDrained = scene.add.image(0, 0, "drained_a").setAlpha(0);

        /* Add object to container */
        this.add(this.art);
        this.add(this.bg);
        this.add(this.factionIcon);
        this.add(this.id);
        this.add(this.set);
        this.add(this.title);
        if (this.flavor !== undefined)
        {
            this.add(this.flavor);
        }
        if (bBaseAttr.type == CardType.ship &&
            this.model !== undefined &&
            this.role !== undefined &&
            this.dataFrame !== undefined &&
            this.strength !== undefined &&
            this.speed !== undefined) {

            this.add(this.model);
            this.add(this.role);
            this.add(this.dataFrame);
            this.add(this.strength);
            this.add(this.speed);
        }
        if (this.shipAttr?.cost !== undefined &&
            this.costFrame !== undefined &&
            this.cost !== undefined) {

            this.add(this.costFrame);
            this.add(this.cost);
        }
        this.add(this.back);
        this.add(this.frameDrained);

        /* Set Object position */
        this.setPosition(x, y);

        /* Add the container to the scene */
        scene.add.existing(this);

        /* Set-up behaviour and events */
        this.setUpEvents();

        //this.on("clicked", this.click, this);
        //this.on('dragging', this.drag, this);

        //console.log("New card id [" + this.baseAttr.id + "], depth: " + this.depth)

    }

    setUpEvents() {

        /* Create self reference */
        let self = this

        /* Set container as interactive */
        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -this.bg.width / 2,
                -this.bg.height / 2,
                this.bg.width,
                this.bg.height
            ),
            Phaser.Geom.Rectangle.Contains
        )

        /* Make it Draggable */
        this.scene.input.setDraggable(this);

        // ON CLICK DOWN 
        this.on('pointerdown', function (pointer: Phaser.Input.Pointer, object: CardBase) {
            //console.log("click_down on id: " + self.baseAttr.id)
            self.clickDown()
        }, this)

        // ON CLICK UP 
        this.on('pointerup', function (pointer: Phaser.Input.Pointer, object: CardBase) {
            //console.log("click_up on id: " + self.baseAttr.id)
            self.clickUp(pointer)
        }, this)

        /*         // ON HOVER IN 
                this.on('pointerover', function (pointer: Phaser.Input.Pointer, object: CardBase) {
                    console.log("pointerover on id: " + self.baseAttr.id)
                    self.hover()
                }, this)
        
                // ON HOVER OUT 
                this.on('pointerout', function (pointer: Phaser.Input.Pointer, object: CardBase) {
                    //console.log("pointerout on id: " + self.baseAttr.id)
                    self.unhover()
                }, this) */

        /* DRAG START */
        this.on('drag', function (pointer: Phaser.Input.Pointer, object: CardBase) {
            //console.log('dragging id: ' + self.baseAttr.id)
            self.drag(pointer)
        }, this)
    }

    flip() {

        const currentScaleX = this.scaleX;
        const currentScaleY = this.scaleY;

        const duration: number = 100;

        const timeline = this.scene.tweens.timeline({
            onComplete: () => {
                timeline.destroy();
            },
        });

        timeline.add({
            targets: this,
            scale: this.scale * 1.1,
            duration: duration,
            ease: "Cubic.inOut",
        });

        timeline.add({
            targets: this,
            scaleX: 0,
            duration: duration,
            delay: 10,
            ease: "Cubic.inOut",
            onComplete: () => {
                if (this.back.visible) {
                    this.back.setVisible(false);
                } else {
                    this.back.setVisible(true);
                }
            },
        });

        timeline.add({
            targets: this,
            scaleX: currentScaleX * 1.1,
            duration: duration,
            ease: "Cubic.inOut",
        });

        timeline.add({
            targets: this,
            scaleX: currentScaleX,
            scaleY: currentScaleY,
            duration: duration,
            ease: "Cubic.inOut",
        });

        timeline.play();
    }

    drag(pointer: Phaser.Input.Pointer) {

        if (this.zoomStatus === CardZoomStatus.default) {

            /* Notify that the card is being dragging */
            this.dragging = true;

            /* Bring to top */
            this.scene.children.bringToTop(this);

            /* Update the position of the card */
            this.x = pointer.x
            this.y = pointer.y
        }
    }
    clickDown() {

        if (this.zoomStatus === CardZoomStatus.default) {
            this.xPosOnClick = this.x
            this.yPosOnClick = this.y
        }

        this.depthOnClick = this.depth

        if (this.zoomStatus === CardZoomStatus.hover) {
            this.unhover()
        }
    }

    clickUp(pointer: Phaser.Input.Pointer) {

        if (pointer.rightButtonReleased()) {
            this.flip()
        }
        else {

            if (!this.dragging) {

                if ((this.zoomStatus == CardZoomStatus.default) || (this.zoomStatus === CardZoomStatus.hover)) {

                    /* Bring to top */
                    this.scene.children.bringToTop(this)

                    this.scene.tweens.add({
                        targets: this,
                        x: this.scene.cameras.main.centerX,
                        y: this.scene.cameras.main.centerY,
                        scale: 0.55,
                        duration: 150,
                        ease: "Cubic.inOut",
                        yoyo: false,
                        repeat: 0,
                    });

                    /* Change zoomStatus */
                    this.zoomStatus = CardZoomStatus.click;

                    /** @todo Make dynamic buttons for the card */

                } else if (this.zoomStatus == CardZoomStatus.click) {
                    this.scene.tweens.add({
                        targets: this,
                        x: this.xPosOnClick,
                        y: this.yPosOnClick,
                        scale: 0.1,
                        duration: 150,
                        ease: "Cubic.inOut",
                        yoyo: false,
                        repeat: 0,
                    });

                    /* Change zoomStatus */
                    this.zoomStatus = CardZoomStatus.default;

                    /* Go back to the previous position */
                    this.depth = this.depthOnClick
                    console.log('go back to depth: ' + this.depth)
                }
            }
            else {

                /* Stop draggin notify */
                this.dragging = false

                /* Update card position */
                /*  this.xPosOnClick = this.x
                 this.yPosOnClick = this.y */
            }
        }
    }

    hover() {

        if (this.zoomStatus === CardZoomStatus.default) {

            /* Save old position */
            this.xPosOnClick = this.x
            this.yPosOnClick = this.y

            /* Bring to top */
            this.scene.children.moveUp(this);

            /* Set the scale for the zoom on hover */
            let scale: number = 2.5

            /* Set the new center position after scale */
            let xOffset: number = (this.bg.width * this.scale * scale) / 2 - (this.bg.width * this.scale) / 2
            let yOffset: number = (this.bg.height * this.scale * scale) / 2 - (this.bg.height * this.scale) / 2

            this.scene.tweens.add({
                targets: this,
                x: this.x + xOffset,
                y: this.y - yOffset,
                scale: this.scale * scale,
                duration: 25,
                ease: "Cubic.inOut",
                yoyo: false,
                repeat: 0,
            })

            this.zoomStatus = CardZoomStatus.hover
        }
    }

    unhover() {

        if (this.zoomStatus === CardZoomStatus.hover) {
            let scale: number = 1 / 2.5

            let xOffset: number = (this.bg.width * this.scale) / 2 - (this.bg.width * this.scale * scale) / 2
            let yOffset: number = (this.bg.height * this.scale) / 2 - (this.bg.height * this.scale * scale) / 2

            this.scene.tweens.add({
                targets: this,
                x: this.xPosOnClick,
                y: this.yPosOnClick,
                scale: 0.1,
                duration: 25,
                ease: "Cubic.inOut"
            })

            this.zoomStatus = CardZoomStatus.default

            this.scene.children.moveDown(this);
        }
    }

    drain() {
        this.frameDrained.setAlpha(0);
        this.scene.tweens.add({
            targets: this.frameDrained,
            alpha: 1,
            duration: 1000,
            yoyo: true,
            ease: "Power1.inOut",
            repeat: -1
        })
    }

    undrain() {
        this.scene.tweens.add({
            targets: this.frameDrained,
            alpha: 0,
            duration: 1000,
            yoyo: false,
            ease: "Power1.inOut",
            repeat: -1
        })
    }

    move(x: number, y: number) {
        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            duration: 100,
            yoyo: false,
            ease: "Power1.inOut",
            repeat: 0
        })
    }

    getBaseAttr() {
        return this.baseAttr;
    }

    getShipAttr() {
        return this.shipAttr;
    }

    getSize(): CardSize {
        let size: CardSize = {
            width: this.bg.width * this.scale,
            height: this.bg.height * this.scale
        }

        return size
    }

    updateZone(zone: EdbcGameZone) {
        this.currentZone = zone;
/*         console.log("Card: " + this.baseAttr.title +
            " (" + this.baseAttr.id + ") is in zone: " +
            this.currentZone.name) */
    }

    getZone(): EdbcGameZone {
        return this.currentZone
    }

}
