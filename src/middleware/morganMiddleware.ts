import morgan, {StreamOptions} from "morgan";
import config from "config";
import Logger from "../../config/logger";

// imprime as mensagens de log na resposta da API
const stream: StreamOptions = {
    write: (message) => {
        Logger.info(message);
    }
};

// exerção para situações onde o log não deve ser apresentado na API
const skip = () => {
    const env = config.get<string>("env") || "development"
    return env !== "development"
} // neste caso, só vamos imprime as mensagens de log em ambiente de desenvolvimento!

const morganMiddleware = morgan(
    ":method :url : status :res[content-length - :response-time ms]",
    {stream, skip}
);

export default morganMiddleware;