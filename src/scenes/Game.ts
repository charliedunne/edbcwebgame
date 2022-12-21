import Phaser from 'phaser';
import {edbc_preload} from './AssetsPreload'
import CardBase from '../engine/CardBase';
import {CardType, CardFaction} from '../engine/CardBase';

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
    
    let center_x = this.sys.game.canvas.width/2;
    let center_y = this.sys.game.canvas.height/2;
    center_x = 700;
    center_y = 360;
    console.log("center_x: " + center_x);
    console.log("center_y: " + center_y);

    const card = new CardBase(this, center_x, center_y, {id: 0, name: "Adder", type: CardType.action, faction: CardFaction.neutral}, {bg: 'ship_alliance_bg'});
    card.setScale(0.5);

    this.input.enableDebug(card)
    
      
      
      
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
  