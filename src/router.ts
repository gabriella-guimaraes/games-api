import { Router, Request, Response } from "express";
import { createGame, findGameById } from "./controllers/gameControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { gameCreateValidation } from "./middleware/gameValidation";

const router = Router();

export default router.get("/test", (req: Request, res: Response) => {
   return res.status(200).send("API Working!");
})
.post("/game", gameCreateValidation(), validate, createGame)
.get("/game/:id", findGameById)