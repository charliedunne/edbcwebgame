import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import Board from './scenes/Board';

import express from "express"
import { connectToDatabase } from "./services/database.service"
import { factionsRouter } from "./routes/faction.router"

new Phaser.Game(
  /* Object.assign(config, {
    scene: [GameScene]
  })
  */
  Object.assign(config, {
    scene: [Board]
  })
);

const app = express()
const port: number = 8081

connectToDatabase()
  .then(() => {
    app.use("/games", factionsRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
 

