import { Request, Response } from "express";
import { Types } from "mongoose";

// Model
import { GameModel } from "../models/Game";

// Logger
import Logger from "../../config/logger";

export async function createGame(req: Request, res: Response) {
    try {
        const data = req.body;
        const game = await GameModel.create(data);

        return res.status(201).json(game);
    } catch (error: any) {
        Logger.error(`An error occurred while creating: ${error.message}`);
    }
};

// Get - id
export async function findGameById(req:Request, res: Response) {
    try {
        const id = req.params.id;
        // Verifica se o valor é um ObjectId válido 
        if(!Types.ObjectId.isValid(id)) {
           return res.status(404).json({ error: "Id inválido." });
        }

        const game = await GameModel.findById(id);

        if(!game) {
            return res.status(404).send("Game not found!");
        }

        return res.status(200).json(game);
    } catch (error: any) {
        Logger.error(`An error occurred while searching the game: ${error.message}`);
    }
}