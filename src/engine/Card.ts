
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

/* Private classes */
class CardBaseVisuals {

    /* Background */
    bg: Phaser.GameObjects.Image;
    back: Phaser.GameObjects.Image;
    art: Phaser.GameObjects.Image;


    constructor(
        scene: Phaser.Scene,
        type: CardType,
        faction: CardFaction,
        set: CardSet,
        art: string = "no_image"
    ) {

        // Configure background depending on type
        let bgKey = "bg_" + type;

        if (type != CardType.outfitting) {
            bgKey = bgKey + "_" + faction;
        }

        // Create Phaser Objects
        this.bg = scene.add.image(0, 0, bgKey)
        this.back = scene.add.image(0, 0, "card_back")
        this.art = scene.add.image(0, 0, art)
    }
}


export default  class Card extends Phaser.GameObjects.Container {

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
        this.baseVisuals = new CardBaseVisuals(scene, baseAttr.type,
            baseAttr.faction, baseAttr.set, baseAttr.art);

        // Add elements to container
        this.add(this.baseVisuals.back);
        this.add(this.baseVisuals.art);
        this.add(this.baseVisuals.bg);

        if (this.faceDown)
        {
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

    showBack() : void {
        this.moveTo(this.baseVisuals.back, this.list.length-1);
    }

    hideBack() : void {
        this.sendToBack(this.baseVisuals.back);
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