import GameZone from "../engine/GameZone";

export enum CardType {
    none = "none",
    ship = "ship",
    action = "action",
    outfitting = "outfitting",
    mission = "mission",
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
    figher = "Fighter",
    warship = "Warship",
    multipurpose = "Multipurpose",
    liner = "Liner",
    miner = "Miner",
    explorer = "Explorer",
    transport = "Transport",
    bountyHunter = "Bounty Hunter",
}

enum CardZoomStatus {
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

type CardBaseAttr = {
    id: number;
    set: CardSet;
    title: string;
    type: CardType;
    faction: CardFaction;
    flavor?: string;
};

type CardShipAttr = {
    cost: number;
    karma: number;
    strength: number;
    speed: number;
    builder: string;
    model: string;
    role: ShipRole;
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

    constructor(type: CardType, faction: CardFaction, set: CardSet) {
        this.bg = "bg_" + type;

        if (type != CardType.outfitting) {
            this.bg = this.bg + "_" + faction;
        }

        this.set = set.toString();
    }
}

export default class CardBase extends Phaser.GameObjects.Container {
    /* --- Private members --- */

    /* Scene */
    scene: Phaser.Scene;

    /* Position */
    preZoomXPos: number;
    preZoomYPos: number;

    /* Dragging flag */
    dragging: Boolean;
    isTrigger: Boolean;

    /* Status */
    zoomStatus: CardZoomStatus;

    /* Zone */
    currentZone: GameZone;

    /* Background */
    bg: Phaser.GameObjects.Image;
    back: Phaser.GameObjects.Image;
    frameDrained: Phaser.GameObjects.Image;

    /* Faction icon */
    factionIcon: Phaser.GameObjects.Image;

    /* Card ID */
    id: Phaser.GameObjects.BitmapText;

    /* Card Set */
    set: Phaser.GameObjects.Image;

    /* Card Title */
    title: Phaser.GameObjects.BitmapText;

    /* Card Manufacturer, Model and role */
    model: Phaser.GameObjects.BitmapText;
    role: Phaser.GameObjects.BitmapText;

    /* Ship Technical Data */
    costFrame: Phaser.GameObjects.Image;
    dataFrame: Phaser.GameObjects.Image;
    cost: Phaser.GameObjects.BitmapText;
    strength: Phaser.GameObjects.BitmapText;
    speed: Phaser.GameObjects.BitmapText;

    /* Card Data */
    baseAttr: CardBaseAttr;
    shipAttr: CardShipAttr;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        bBaseAttr: CardBaseAttr,
        bShipAttr: CardShipAttr
    ) {
        /* Call the Base constructor */
        super(scene, x, y);

        /* Save scene */
        this.scene = scene;

        /* Initial position */
        this.preZoomXPos = x;
        this.preZoomYPos = y;


        /* Position */
        this.x = x;
        this.y = y;

        /* Dragging flag */
        this.dragging = false;
        this.isTrigger = false;

        /* Reset zoom status */
        this.zoomStatus = CardZoomStatus.default;

        /* Save data */
        this.baseAttr = bBaseAttr;
        this.shipAttr = bShipAttr;

        /* -- Set Card Visuals -- */

        /* Chose background */
        let visuals = new CardVisuals(
            bBaseAttr.type,
            bBaseAttr.faction,
            bBaseAttr.set
        );
        this.bg = scene.add.image(0, 0, visuals.bg);

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
                "orbitron",
                bBaseAttr.title.toUpperCase(),
                85
            )
            .setOrigin(0, 0);
        this.title.setTint(CardColor[bBaseAttr.faction]);

        /* Ship model details */
        if (bBaseAttr.type == CardType.ship) {
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

        /* Ship attr */
        if (this.shipAttr.karma === undefined) {
            this.shipAttr.karma = 0;
        }

        if (bBaseAttr.type == CardType.ship) {
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

        /* Create Card Back */
        this.back = scene.add.image(0, 0, "card_back");

        /* Frames */
        this.frameDrained = scene.add.image(0, 0, "drained_a").setAlpha(0);

        /* Add object to container */
        this.add(this.bg);
        this.add(this.factionIcon);
        this.add(this.id);
        this.add(this.set);
        this.add(this.title);
        if (bBaseAttr.type == CardType.ship) {
            this.add(this.model);
            this.add(this.role);
            this.add(this.dataFrame);
            this.add(this.strength);
            this.add(this.speed);
        }
        if (this.shipAttr?.cost !== undefined) {
            this.add(this.costFrame);
            this.add(this.cost);
        }
        this.add(this.back);
        this.add(this.frameDrained);

        /* Set Object position */
        this.setPosition(x, y);

        /* Add the container to the scene */
        scene.add.existing(this);

        /* Set container as interactive */
        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -this.bg.width / 2,
                -this.bg.height / 2,
                this.bg.width,
                this.bg.height
            ),
            Phaser.Geom.Rectangle.Contains
        );

        /* Make it Draggable */
        this.scene.input.setDraggable(this);

        this.on("clicked", this.click, this);
        //this.on('dragging', this.drag, this);
    }

    flip() {
        console.log("flipping...");

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

    drag(newX: number, newY: number) {
        console.log("drag");
        this.isTrigger = false;
        this.preZoomXPos = newX;
        this.preZoomYPos = newY;
    }

    trigger() {
        console.log("trigger");
        this.isTrigger = true;
    }

    bringToTop(child: Phaser.GameObjects.GameObject): this {
        this.scene.children.bringToTop(this);
    }

    click() {

        if (this.zoomStatus == CardZoomStatus.default && this.isTrigger == true) {
            /* Bring to top */
            this.scene.children.bringToTop(this);

            this.preZoomXPos = this.x;
            this.preZoomYPos = this.y;

            this.scene.tweens.add({
                targets: this,
                x: this.scene.cameras.main.centerX,
                y: this.scene.cameras.main.centerY,
                scale: 0.55,
                duration: 300,
                ease: "Cubic.inOut",
                yoyo: false,
                repeat: 0,
            });

            /* Change zoomStatus */
            this.zoomStatus = CardZoomStatus.click;
            this.isTrigger = false;
        } else if (
            this.zoomStatus == CardZoomStatus.click &&
            this.isTrigger == true
        ) {
            this.scene.tweens.add({
                targets: this,
                x: this.preZoomXPos,
                y: this.preZoomYPos,
                scale: 0.1,
                duration: 300,
                ease: "Cubic.inOut",
                yoyo: false,
                repeat: 0,
            });

            /* Change zoomStatus */
            this.zoomStatus = CardZoomStatus.default;
            this.isTrigger = false;
        }
    }

    hover() {

        /* Bring to top */
        this.scene.children.bringToTop(this);

        this.preZoomXPos = this.x;
        this.preZoomYPos = this.y;

        this.scene.tweens.add({
            targets: this,
            x: this.x + this.bg.width/2*this.scale,
            y: this.y - this.bg.height/2*this.scale,
            scale: this.scale * 2,
            duration: 100,
            ease: "Cubic.inOut",
            yoyo: false,
            repeat: 0,
/*             onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    x: this.preZoomXPos,
                    y: this.preZoomYPos,
                    scale: 0.1,
                    duration: 100,
                    ease: "Cubic.inOut",
                })
            }, */

        })
    }

    unhover() {
        this.scene.tweens.add({
            targets: this,
            x: this.preZoomXPos,
            y: this.preZoomYPos,
            scale: 0.1,
            duration: 100,
            ease: "Cubic.inOut"
        })
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

    move(x:number, y: number) {
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

    getSize() {
        console.log("CardBase scale: " + this.scale);
        return [this.bg.width * this.scale, this.bg.height * this.scale];
    }

    updateZone(zone:GameZone)
    {
        this.currentZone = zone;
        console.log("Card: " + this.baseAttr.title + 
        " (" + this.baseAttr.id + ") is in zone: " + 
        this.currentZone.name)
    }
}
