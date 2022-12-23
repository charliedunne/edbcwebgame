import Phaser, { Core } from 'phaser';
import {edbc_preload} from './AssetsPreload'
import CardBase from '../engine/CardBase';
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
      this.cameras.main.centerX, this.cameras.main.centerY,
      {id: 1, set: CardSet.core, title: "Adder", type: CardType.ship, faction: CardFaction.federation});
      card.setScale(0.55);
    
     
//    this.input.enableDebug(card)
      
      
      
      
      /*
      const logo = this.add.image(400, 70, 'logo');
      
      this.tweens.add({
        targets: logo,
        y: 350,
        duration: 1500,
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1
      });
      */
    }
  }

  