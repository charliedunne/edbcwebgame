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
    
    const card = new CardBase(
      this, 
      100, 1000,
      {id: 1, set: CardSet.core, title: "Orca Delta", 
      type: CardType.ship, faction: CardFaction.alliance},
      {cost:5, karma: 0, strength: 4, speed: 30, builder: 'saud kruger', model: 'orca', role: [ShipRole.liner]});
      card.setScale(0.1);
    
      
      this.tweens.add({
        targets: card,
        x: this.cameras.main.centerX,
        y: this.cameras.main.centerY,
        scale: 0.55,
        duration: 500,
        ease: 'Cubic.inOut',
        yoyo: false,
        repeat: 0
      });
    }
  }

  