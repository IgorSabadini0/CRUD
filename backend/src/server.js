import express, { json } from 'express';
import { config } from 'dotenv';
import path from 'path';
import db from './config/db.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
    res.redirect('pages/auth/index.html')
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

app.post('/auth', async (req, res) => {
    const user = req.body.user; // o .user refere-se ao name="user" do input la do frontend
    const password = req.body.password; // o .password refere-se ao name="password"

    try {
        const verificarDB = "SELECT user, password FROM login WHERE user = ? AND password = ?";
        const [rows] = await db.query(verificarDB, [user, password]);

        if (rows.length === 0) {
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
        }

        const usuario = rows[0] //o primeiro valor do array é o usuário do retorno da query que foi solicitado.

        return res.status(200).json({
            mensagem: 'Login efetuado com sucesso',
            redirectUrl: '/pages/main/index.html',
            usuario: {
                nome: usuario.user
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor. ' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/* 
    Criar nossa API de Usuários

    -Criar um usuário
    -Listar todos os usuarios
    -Editar um usuario
    -Deletar um usuario

*/