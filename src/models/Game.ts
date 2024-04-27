import { model, Schema } from "mongoose";

const gameSchema = new Schema(
    {
        title: {type: String},
        rating: {type: Number},
        description: {type: String},
        platform: {type: String},
        favCharacters: {type: Array},
        poster: {type: String}
    },
    {
        timestamps: true // adiciona a data que o game foi criado e a data de atualização (na base de dados)
    }
)

// instanciando o model de games
export  const GameModel = model("Game", gameSchema);