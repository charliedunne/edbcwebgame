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

class CardAttributes {
    id: number = 0;
    name: string = 'none';
    type: CardType = CardType.none;
    faction: CardFaction = CardFaction.none;
    //flavor?: string = '';
}

class CardVisuals {
    bg: string = 'bg_none';

    constructor(type: CardType, faction: CardFaction) {
        
        this.bg = 'bg_' + type;

        if (type != CardType.outfitting) {
            this.bg = this.bg + "_" + faction
        }

    }
}

export default class CardBase extends Phaser.GameObjects.Container {
    
    /* Private members */
    bg: Phaser.GameObjects.Image;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        attr: CardAttributes) {
            
            /* Call the Base constructor */
            super(scene, x, y);

            /* Set Card Visuals */
            let visuals = new CardVisuals(attr.type, attr.faction);
            this.bg = scene.add.image(x, y, visuals.bg).setOrigin(0.5, 0.5);


            /* Add object to container */
            this.add(this.bg);

            /* Add the container to the scene */
            scene.add.existing(this);
        }
    }
    