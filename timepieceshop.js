//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/timepieceshop',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model/collection do seu projeto - começo da model usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String, required : true}
});


const Usuario = mongoose.model("Usuário", UsuarioSchema);


//configurando os roteamentos da model usuario
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    //testando se todos os campos foram preenchidos
    if(email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    } 

    //teste mais importante da ac 
    const emailExiste = await Usuario.findOne({email:email});

    if(emailExiste){
        return res.status(400).json({error : "Esse email já está registrado no sistema."});
    }

    //como fica no postman pra add 
    const usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }

});
// fim da model usuario 


// começo da model especifica - produtorelogio
const produtorelogioSchema = new mongoose.Schema({
    id_produtorelogio : {type : Number, required : true},
    descricao : {type : String, required : true},
    marca : {type : String, required : true},
    data_fabricacao : {type : Date, required : true},
    anos_garantia : {type : Number, required : true}
});


const produtorelogio = mongoose.model("Relogios_produtos", produtorelogioSchema);


//configurando os roteamentos da model usuario
app.post("/produtorelogio", async(req, res)=>{
    id_produtorelogio = req.body.id_produtorelogio;
    descricao = req.body.descricao;
    marca = req.body.marca;
    data_fabricacao = req.body.data_fabricacao;
    anos_garantia = req.body.anos_garantia;


    //testando se todos os campos foram preenchidos
    if(id_produtorelogio == null || descricao == null || marca == null || data_fabricacao == null || anos_garantia == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    } 

    //verificar se já existe o id
    const id_produtorelogioExiste = await produtorelogio.findOne({id_produtorelogio:id_produtorelogio});
 
    if(id_produtorelogioExiste){
        return res.status(400).json({error : "Esse id já está registrado no sistema."});
    }

    //como fica no postman pra add 
    const produtorelogio = new Usuario({
        id_produtorelogio : id_produtorelogio,
        descricao : descricao,
        marca : marca,
        data_fabricacao : data_fabricacao,
        anos_garantia : anos_garantia
    })


    try{
        const newprodutorelogio = await produtorelogio.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }

});


//rota raiz - inicio do inw por causa da pág html
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});


//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});