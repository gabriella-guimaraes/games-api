import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

// Verifica se a pasta "uploads" existe e, se não, cria a pasta
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento no disco
const storage = multer.diskStorage({
  destination: function (req: Request, poster: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {
    cb(null, "uploads/");
  },
  filename: function (req: Request, poster: Express.Multer.File, cb: (error: Error | null, poster: string) => void): void {
    cb(null, Date.now() + path.extname(poster.originalname));
  }
});

// Inicializa o upload com a configuração de armazenamento
const upload = multer({ storage });

export default upload;