import { Request, Response } from "express";

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