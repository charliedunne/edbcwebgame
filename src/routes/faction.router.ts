// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Faction from "../models/faction";

// Global Config
export const factionsRouter = express.Router();

factionsRouter.use(express.json());


// GET
factionsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const games = (await collections.factions.find({}).toArray()) as Faction[];

        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

factionsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const game = (await collections.factions.findOne(query)) as Faction;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST

factionsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newFaction = req.body as Faction;
        const result = await collections.factions.insertOne(newFaction);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
factionsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedFaction: Faction = req.body as Faction;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.factions.updateOne(query, { $set: updatedFaction });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE

factionsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.factions.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});