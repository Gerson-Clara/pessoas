const express = require('express');
const app = express();
const port = 3000;

app.use('/css', express.static('public/assets/css'));
app.use('/js', express.static('public/assets/js'));

app.get('/',function(req,res){
    //__dirname retorna o diretorio raiz da aplicação. Aqui estamos pegando o caminho raiz mais o caminho de onde está o html
    res.sendFile(__dirname+'/public/index.html')
})

// app.get('/teste', (req, res) => {
//     res.send('<h2>Tesdte: Express</h2>')
// });

// para reconhecer os dados recebidos como sendo um objeto no formato JSON
app.use(express.json());

// Arquivo com rotas do cadastro de pessoas
const pessoas = require('./controllers/pessoas');

// identificação da rota e da const (require) associada
app.use('/pessoas', pessoas);

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`);
});

