import { config } from 'dotenv';
config();
import { createPool } from 'mysql2/promise';

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;

const testarConexao = async () => {
    try {
        const connection = await db.getConnection();
        console.log("Conectado com sucesso ao BD.");
        connection.release;
    } catch (error) {
        console.error("Erro ao conectar ao banco:", error.message);
    }
}

testarConexao();