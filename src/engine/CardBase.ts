export enum CardType {
    none = 'none',
    ship = 'ship',
    action = 'action',
    outfitting = 'outfitting',
    mission = 'mission'
}

export enum CardFaction {
    none = 'none',
    alliance = 'alliance',
    empire = 'empire',
    federation = 'federation',
    neutral = 'neutral'
}

export enum CardSet {
    core = 'coriolis'
}

type CardBaseAttr = {
    id: number;
    set: CardSet;
    title: string;
    type: CardType;
    faction: CardFaction;
    flavor?: string;    
}

type CardShipAttr = {
    cost: number;
    karma: number;
    strength: number;
    speed: number;
    builder: string;
    model: string;
}

/*
export class CardAttributes {
    id: number = 0;
    title: string = 'none';
    type: CardType = CardType.none;
    faction?: CardFaction = CardFaction.none;
    flavor?: string = '';

    constructor () {
        this.id = 0;
        this.title = 'none';
        this.type = CardType.none;
        this.faction = CardFaction.none;
        this.flavor = '';
    }
}
*/


const padLeft = (number: number, length: number, character: string = '0'): string => {
    let result = String(number);
    for (let i = result.length; i < length; ++i) {
      result = character + result;
    }
    return result;
  };


class CardVisuals {
    bg: string = 'bg_none';
    set: string = 'set_none';

    constructor(type: CardType, faction: CardFaction, set: CardSet) {
        
        this.bg = 'bg_' + type;

        if (type != CardType.outfitting) {
            this.bg = this.bg + "_" + faction
        }

        this.set = set.toString();

        console.log(this.bg)
        console.log(this.set)
    }
}

export default class CardBase extends Phaser.GameObjects.Container {
    
    /* --- Private members --- */

    /* Background */
    bg: Phaser.GameObjects.Image;

    /* Card ID */
    id: Phaser.GameObjects.BitmapText;

    /* Card Set */
    set: Phaser.GameObjects.Image;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        bBaseAttr: CardBaseAttr,
        bShipAttr?: CardShipAttr,
        ) {
            
            /* Call the Base constructor */
            super(scene, x, y);

            /* -- Set Card Visuals -- */

            /* Chose background */
            let visuals = new CardVisuals(bBaseAttr.type, bBaseAttr.faction, bBaseAttr.set);
            this.bg = scene.add.image(0, 0, visuals.bg)

            /* Print Card ID */
            this.id = scene.add.bitmapText(512, 810, 'eurostile', padLeft(bBaseAttr.id, 3), 45).setOrigin(0.5, 0.5);
            this.id.setTint(0xd2b679)
            
            /* Print Card Core Icon */
            this.set = scene.add.image(0, 0, visuals.set)

            /* Add object to container */
            this.add(this.bg);
            this.add(this.id);
            this.add(this.set);

            /* Set Object position */
            this.setPosition(x, y);

            /* Add the container to the scene */
            scene.add.existing(this);
        }
    }
    