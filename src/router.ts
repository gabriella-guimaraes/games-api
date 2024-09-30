import { Router, Request, Response } from "express";
import { createGame, findGameById, getAllGames, removeGame, updateGame } from "./controllers/gameControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { gameCreateValidation } from "./middleware/gameValidation";

// multer config
import upload from "../config/multer";

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
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the game
 *               rating:
 *                 type: number
 *                 description: The rating of the game (between 0 and 100)
 *               description:
 *                 type: string
 *                 description: A short description of the game
 *               platform:
 *                 type: string
 *                 description: The platform on which the game is available
 *               favCharacters:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The favorite characters of the game
 *               poster:
 *                 type: string
 *                 format: binary
 *                 description: The image poster of the game (uploaded file)
 *     responses:
 *       '201':
 *         description: Game created successfully
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
.post("/game", upload.single("poster"), gameCreateValidation(), validate, createGame)
.get("/game/:id", findGameById)
.get("/game", getAllGames)
.delete("/game/:id", removeGame)
.patch("/game/:id", gameCreateValidation(), validate, updateGame)