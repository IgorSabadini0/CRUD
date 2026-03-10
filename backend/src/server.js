import express, { json } from 'express';
import { config } from 'dotenv';
import path from 'path';
import db from './config/db.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/clientes', async (req, res) => {
    try {
        const puxarDados = db.query("SELECT * FROM login");
        const [rows] = await puxarDados;
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error.message);
        res.status(500).json({ error: "Erro ao buscar clientes" });
    }
});

/* 
    Criar nossa API de Usuários

    -Criar um usuário
    -Listar todos os usuarios
    -Editar um usuario
    -Deletar um usuario

*/