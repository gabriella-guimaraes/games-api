import { Router, Request, Response } from "express";
import { createGame, findGameById, getAllGames, removeGame } from "./controllers/gameControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { gameCreateValidation } from "./middleware/gameValidation";

const router = Router();

export default router.get("/test", (req: Request, res: Response) => {
   return res.status(200).send("API Working!");
})
.post("/game", gameCreateValidation(), validate, createGame)
.get("/game/:id", findGameById)
.get("/game", getAllGames)
.delete("/game/:id", removeGame)