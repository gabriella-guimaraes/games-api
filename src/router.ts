import { Router, Request, Response } from "express";
import { createGame, findGameById, getAllGames, removeGame, updateGame } from "./controllers/gameControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { gameCreateValidation } from "./middleware/gameValidation";

const router = Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Check if the API is available.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /game:
 *   post:
 *     summary: Create a new game.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       '201':
 *         description: Created
 *   get:
 *     summary: Return all the games.
 *     responses:
 *       '200':
 *         description: OK
 *   delete:
 *     summary: Remove a game by Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the game to be removed.
 *     responses:
 *       '204':
 *         description: No Content
 */

/**
 * @swagger
 * /game/{id}:
 *   get:
 *     summary: Return a game by its Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the game.
 *     responses:
 *       '200':
 *         description: OK
 *   patch:
 *     summary: Update a game by its Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the updated game.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       '200':
 *         description: OK
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         rating:
 *           type: number
 *         description:
 *            type: string
 *         platform:
 *           type: string
 *         favCharacters:
 *           type: array
 *           items:
 *            type: string
 *         poster:
 *           type: string
 *       required:
 *         - title
 *         - rating
 *         - platform
 *         - description
 *         - platform
 *         - favCharacters
 *         - poster
 */

export default router.get("/test", (req: Request, res: Response) => {
   return res.status(200).send("API Working!");
})
.post("/game", gameCreateValidation(), validate, createGame)
.get("/game/:id", findGameById)
.get("/game", getAllGames)
.delete("/game/:id", removeGame)
.patch("/game/:id", gameCreateValidation(), validate, updateGame)