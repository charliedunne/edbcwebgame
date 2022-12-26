import Phaser, { Core } from 'phaser';
import {edbc_preload} from './AssetsPreload'
import CardBase, { ShipRole } from '../engine/CardBase';
import {CardType, CardFaction, CardSet} from '../engine/CardBase';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  
  preload() {
    
    /* EDBC Preaload Assets */
    edbc_preload(this);
    
    /*
    this.load.image('logo', 'assets/phaser3-logo.png');
    */
  }
  
  create() {
    
    let cards: CardBase[];
    
    cards = [];
    
    
    for (let i = 0; i < 12; ++i) {
      for (let j = 0; j < 5; ++j) {
        
        let card = new CardBase(
          this, 
          130 + i*150, 200+j*200,
          {id: 1, set: CardSet.core, title: "Orca Delta", 
          type: CardType.ship, faction: CardFaction.empire},
          {cost:5, karma: 0, strength: 4, speed: 30, builder: 'saud kruger', model: 'orca', role: [ShipRole.liner]});
          card.setScale(0.1);
          
          let card2 = new CardBase(
            this, 
            130 + 1*150, 200+1*200,
            {id: 2, set: CardSet.core, title: "Adder Cornucopia", 
            type: CardType.ship, faction: CardFaction.federation},
            {cost:3, karma: 1, strength: 2, speed: 60, builder: 'Audi', model: 'ADDER', role: [ShipRole.multipurpose, ShipRole.liner]});
            card2.setScale(0.1);
            
            cards.push(card); 
            cards.push(card2);
          }
        }
        
        this.input.on('gameobjectup', function (pointer, object:CardBase)
        {
          console.log('click');
          object.emit('clicked', object);
        }, this)
        
      }
    }
    
    