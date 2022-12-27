import Phaser, { Core } from 'phaser';
import {edbc_preload} from './AssetsPreload'
import CardBase, { ShipRole } from '../engine/CardBase';
import {CardType, CardFaction, CardSet} from '../engine/CardBase';



/*
export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  
  preload() {
    
    // EDBC Preaload Assets
    edbc_preload(this);
   }
  
  create() {
    
    let cards: CardBase[];
    
    cards = [];
      let card = new CardBase(
        this, 
        130 + 150, 200,
        {id: 1, set: CardSet.core, title: "Orca Delta", 
        type: CardType.ship, faction: CardFaction.empire},
        {cost:5, karma: 0, strength: 4, speed: 30, builder: 'saud kruger', model: 'orca', role: [ShipRole.liner]});
      card.setScale(0.1);     
      
      let card2 = new CardBase(
        this, 
        530, 200,
        {id: 2, set: CardSet.core, title: "Adder Cornucopia", 
        type: CardType.ship, faction: CardFaction.alliance},
        {cost:4, karma: 1, strength: 3, speed: 60, builder: 'Falcon delacy', model: 'Krait MkII', role: [ShipRole.multipurpose]});
      card2.setScale(0.1);  

      let card3 = new CardBase(
        this, 
        830, 200,
        {id: 3, set: CardSet.core, title: "Cutty Imperial", 
        type: CardType.ship, faction: CardFaction.empire},
        {cost:9, karma: 2, strength: 8, speed: 50, builder: 'Imperias Strike', model: 'Imperial Cutter', role: [ShipRole.figher, ShipRole.warship]});
      card3.setScale(0.1);  


      this.input.on('gameobjectdown', function (pointer, object:CardBase)
      {
        object.trigger();
      }, this)
      
      this.input.on('gameobjectup', function (pointer, object:CardBase)
      {
        object.emit('clicked', object);
      }, this)
     
      this.input.on('drag', function(pointer, object:CardBase, dragX, dragY)
      {
        object.x = dragX;
        object.y = dragY;
        object.drag();
      }, this)
      
      this.input.on('dragend', function (pointer, object:CardBase, dragX, dragY)
      {
        //object.undrag();
      }, this)        
      
    }
  }
  */
  
  