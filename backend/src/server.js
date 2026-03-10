const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '../../../frontend/')));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.redirect('index.html')
});

/* 
    Criar nossa API de Usuários

    -Criar um usuário
    -Listar todos os usuarios
    -Editar um usuario
    -Deletar um usuario

*/