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
        return res.status(500).json({error: "Please, try again later."});
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
        return res.status(500).json({error: "Please, try again later."});
    }
}

// GET - all games
export async function getAllGames(req: Request, res: Response) {
    try {
        const games = await GameModel.find();
        return res.status(200).json(games);
    } catch(error: any) {
        Logger.error(`An error occurred while searching all games: ${error.message}`);
        return res.status(500).json({error: "Please, try again later."});
    }
}

// Delete by id
export async function removeGame(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const game = await GameModel.findById(id);

        if(!game) {
            return  res.status(404).json({ error: 'Game not found.' });
        }

        await game.deleteOne();

        return res.status(200).json({ msg: "Game deleted with success!" });
    } catch(error: any) {
        Logger.error(`An error occurred while deleting the game: ${error.message}`);
        return res.status(500).json({error: "Please, try again later."});
    }
}

// UPDATE
export async function updateGame(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const game = await GameModel.findById(id);
        //update game

        if(!game) {
            return res.status(404).send("Game not found!");
        }

        await GameModel.updateOne({_id: id}, data);

        return res.status(200).json(data);

    } catch(error: any) {
        Logger.error(`An error occurred while updating the game: ${error.message}`);
        return res.status(500).json({error: "Please, try again later."});
    }
}