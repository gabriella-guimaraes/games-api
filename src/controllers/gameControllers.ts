import { Request, Response } from "express";

// Model
import { GameModel } from "../models/Game";

// Logger
import Logger from "../../config/logger";

export async function createGame(req: Request, res: Response) {
    return res.status(200).send("Deu certo o controller de games!");
};