import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import Board from './scenes/Board';

new Phaser.Game(
  /* Object.assign(config, {
    scene: [GameScene]
  })
  */
  Object.assign(config, {
    scene: [Board]
  })
);

 

