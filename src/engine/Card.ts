
// Import card types
import CardBase from './CardBase';
import {
    CardType,
    CardSize,
    CardZoomStatus,
    CardSet,
    CardFaction,
    CardColor,
    CardBaseAttr,
    CardShipAttr
} from './CardTypes';

/* CONSTANTS */
const DYN_SPEED = 100

/* Private functions */

/**
 * Create a string adding padding to numbers
 * 
 * @param number Number to render
 * @param length Total lengh of character
 * @param character [Optional] Padding character
 * @returns String
 */
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

/* Private classes */
export class CardBaseVisuals {

    /* Background */
    bg: Phaser.GameObjects.Image;
    back: Phaser.GameObjects.Image;
    art: Phaser.GameObjects.Image;
    flavor: Phaser.GameObjects.BitmapText;
    title: Phaser.GameObjects.BitmapText;
    set: Phaser.GameObjects.Image;
    id: Phaser.GameObjects.BitmapText;
    factionIcon: Phaser.GameObjects.Image;

    constructor(
        scene: Phaser.Scene,
        baseAttr: CardBaseAttr
    ) {

        // Configure background depending on type
        let bgKey = "bg_" + baseAttr.type;

        if (baseAttr.type != CardType.outfitting) {
            bgKey = bgKey + "_" + baseAttr.faction;
        }

        // Create Phaser Objects

        // Art Image
        if (baseAttr.art === undefined) {
            baseAttr.art = "no_image"
        }

        this.art = scene.add.image(0, 0, baseAttr.art)

        // Background Frame and Layout
        this.bg = scene.add.image(0, 0, bgKey)

        // Flavor
        if (baseAttr.flavor === undefined) {
            baseAttr.flavor = ""
        }

        this.flavor = scene.add
            .bitmapText(
                -550,
                this.bg.height / 2 - 125,
                "eurostile",
                baseAttr.flavor.toString(),
                49
            )
            .setOrigin(0, 1);

        // Title
        let titleYPosition: number = 0;
        if (baseAttr.type == CardType.ship) {
            titleYPosition = 70;
        } else {
            titleYPosition = 130;
        }

        this.title = scene.add
            .bitmapText(
                -560,
                titleYPosition,
                "eurostile",
                baseAttr.title.toUpperCase(),
                85
            )
            .setOrigin(0, 0);

        this.title.setTint(CardColor[baseAttr.faction] as unknown as number);

        // Card Set
        this.set = scene.add.image(0, 0, baseAttr.set);

        // ID
        this.id = scene.add
            .bitmapText(512, 810, "eurostile", padLeft(baseAttr.id, 3), 45)
            .setOrigin(0.5, 0.5);
        this.id.setTint(0xd2b679);

        // Faction Icon
        let factionIconYPos: number = 0;
        if (baseAttr.type == CardType.ship) {
            factionIconYPos = 140;
        }
        else {
            factionIconYPos = 205;
        }

        this.factionIcon = scene.add.image(
            510,
            factionIconYPos,
            baseAttr.faction.toString()
        );

        // Card Back
        this.back = scene.add.image(0, 0, "card_back")
    }
}


export default class Card extends Phaser.GameObjects.Container {

    /* - Private members --------------------------------------------------- */

    /* - Public members ---------------------------------------------------- */

    // Scene
    scene: Phaser.Scene;

    // Coordinates
    x: number;
    y: number;

    // Card Data
    baseAttr: CardBaseAttr;

    /* - Protected members ------------------------------------------------- */

    // Card Base Visuals
    baseVisuals: CardBaseVisuals;

    // Status flags
    zoomStatus: CardZoomStatus;
    faceDown: Boolean;

    /* Constructor --------------------------------------------------------- */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        faceDown: Boolean = false,
        baseAttr: CardBaseAttr
    ) {
        // Call Base Constructor
        super(scene, x, y)

        // Save inputs internally
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.baseAttr = baseAttr;

        // Internal status variables
        this.zoomStatus = CardZoomStatus.default;
        this.faceDown = faceDown;

        // Create Visual elements
        this.baseVisuals = new CardBaseVisuals(scene, baseAttr);

        // Add elements to container
        this.add(this.baseVisuals.back);
        this.add(this.baseVisuals.art);
        this.add(this.baseVisuals.bg);
        this.add(this.baseVisuals.title);
        this.add(this.baseVisuals.flavor);
        this.add(this.baseVisuals.set);
        this.add(this.baseVisuals.id);
        this.add(this.baseVisuals.factionIcon);

        if (this.faceDown) {
            this.showBack();
        }

        // Add container to the scene
        scene.add.existing(this);

        // Set-up Dynamics
        this.setUpEvents();
    }

    /* Getters ------------------------------------------------------------- */


    /* Setters ------------------------------------------------------------- */


    /* Public interface ---------------------------------------------------- */

    /**
     * Flip the Card
     */
    flip() {

        // Save current scale
        const currentScaleX = this.scaleX;
        const currentScaleY = this.scaleY;

        // Configure Dynamics
        const duration: number = DYN_SPEED;

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
                if (this.faceDown) {
                    this.hideBack();
                    this.faceDown = false;
                } else {
                    this.showBack();
                    this.faceDown = true;
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

    move() { }

    /* Protected interface ------------------------------------------------- */

    /**
     * Render the back the latests
     */
    showBack(): void {
        this.moveTo(this.baseVisuals.back, this.list.length - 1);
        this.baseVisuals.back.setVisible(true);
    }

    /**
     * Do not render the Back at all
     */
    hideBack(): void {
        this.sendToBack(this.baseVisuals.back);
        this.baseVisuals.back.setVisible(false);
    }

    /* Private interface --------------------------------------------------- */

    setUpEvents() {

        /* Create self reference */
        let self = this

        /* Set container as interactive */
        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -this.baseVisuals.bg.width / 2,
                -this.baseVisuals.bg.height / 2,
                this.baseVisuals.bg.width,
                this.baseVisuals.bg.height
            ),
            Phaser.Geom.Rectangle.Contains
        )

        /* Make it Draggable */
        this.scene.input.setDraggable(this);

        // ON CLICK DOWN 
        this.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            self.clickDown()
        }, this)

        // ON CLICK UP 
        this.on('pointerup', function (pointer: Phaser.Input.Pointer) {
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

    clickDown() {
        console.log("clickDown");
    }

    clickUp(pointer: Phaser.Input.Pointer) {

        // Right Click
        if (pointer.rightButtonReleased()) {
            null;
        }
        else if (pointer.middleButtonReleased()) {
            this.flip()
        }
        else if (pointer.leftButtonReleased()) {
            null;
        }
    }

    drag(pointer: Phaser.Input.Pointer) {

        console.log("drag");
    }
}