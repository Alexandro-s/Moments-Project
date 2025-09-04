// as rotas vao possar por esse arquivo e ele vci realizar o tratamento das rotas 





const { model } = require("mongoose");
const Memory = require("../models/Memory")
const fs = require('node:fs')



// E para manipular esse src vamos utilizar o modulo FS do node file System, esse qie nos permite manipular arquivos 
// essa funcao chamada removeOldimage ela recebe de parametro a memory e para excluir o src ou seja nossa image, 
// vamos utilizar o metodo do fs o fs.unlink esse que recebe nosso caminho para a image como colocamoas na schema ou seja 
// memory.src, esse e o primeiro parametro o segundo e um call back, esse fazendo a checagem se err console.log err se nao imagem excluida com secesso. 

// funcao para deletar a img do BD 

const removeOldimage = (memory) => {
    fs.unlink(`public/${memory.src}`, err => {
        if(err) {
            console.log(err)
        } else {
            console.log("imagem excluida com sucesso")
        }
    });
};




// Vamos criar uma fucnionalidade para o createMemory 

// colocando dentro de um tratamenro de erro e passando o status 500 para error no servidor

// vamos pegar o title e o description que esta vindo do meu req.body 

// E vamos formar o no src. Mas como ? simples passaor a o caminho images/ req.file.filename - 
// Mas pq ? pq queremos ajusta no nome do nosso arquivo por isso antes de vim para ca ele passa 
// em nosso multer de routes. 


// por ultimo outra condicao que se nao vim o title ou a description eu retorno uma resposta com um status 
// de error 400 e uma msg json para preenchimento os campos. 

// Se tu der certo se cria um model novo para ser a memoria esse chamado de newMemory , que recebe o title src e descriptiopn 

// apos criado o model preciso salvar ele no banco entao vou usar o metodo .save() do mongoose esse com await pois toda essa funcao e async 

// Depois de salva passo uma reposta json ou melhor um res.json com a msg -> memoria crida com sucesso ou seja meu feedback e tambem passo a newMemory
// assim posso mexer nela 

const createMemory = async (req, res) => {
    try {

        console.log('Dados do arquivo:', req.file); // Adicione esta linha
        console.log('Corpo da requisição:', req.body); // E esta
        const { title, description } = req.body

        const src = `images/${req.file.filename}`;

        if (!title || !description) return res.status(400).json({ msg: "preencha todos os campos" })

        const newMemory = new Memory({
            title,
            src,
            description
        })
        await newMemory.save();

        res.json({ msg: "MEMORIA CRIADA COM SUCESSO", newMemory })

    } catch (error) {
        res.status(500).send("Caindo aqui Tolo")

    }
};

// Agr vamos criar a funcionalidade para pegar as memorias - 
// Vou criar uma funcao getMemories, essa que sera async recebendo uma requisicao e uma resposta 
// vamos colocar ela dentro de um try catch com status 500 e um send de erro. 
// No try vamos crir uma const chamdada memorias essa que vai armazena as memorias criadas no Memory, e vamos acessar elas por meio do metodo find() esse que vai recuperar os dados. 

// resgata as memorias criadas
const getMemories = async (req, res) => {
    try {

        const memories = await Memory.find()


        // tu esqueceu de retornar ela seu tolo, teme que da como resposta ao serv tolo 
        res.json(memories);

    } catch (error) {
        res.status(500).send("Erro ao tentar recuperar as memorias")

    }

};

// Agr e resgatar dados no caso as memories de forma individual, vamos usar o id delas para isso. Com o metodo findById para filtrar os dados pelo id, e como argumentos desse metodo, entre a requisao e o id vamos aplicar o params esse que serve como um caminho para buscar o id. 
// Agr as condicoes para esse buscar, se nao encotrar a memory essa que vai ser a const que criamos para armazena os dados, se nao a encontrar, retonar um um resposta com status 404 e um json de mememoria nao encontrada. e por ultimo da a res. resposta do servidor com a momory OK. -> rotas agr


// Pega a memory  de forma individual. 
const getMemory = async (req, res) => {
    try {

        const memory = await Memory.findById(req.params.id);

        res.json(memory);

    } catch (error) {

        res.statu(404).json({ msg: "Memoria nao encontra" })

    }
};



// a funcao de deletar os dados do servidor conhecemos de cabo a rabo, porem nao vamos conseguir deletar a img, para isso vamos ter que crir uma funcao a parte para isso. 

// Deleta uma memoria do banco

const deleteMemory = async (req, res) => {
    try {
     const memory = await Memory.findByIdAndDelete(req.params.id);

     if(!memory) {
        return res.status(404).json({msg: "Memoria nao encontrada"})
     }

     removeOldimage(memory)
        res.json({msg: "Memoria excluida com sucesso "});
        
    } catch (error) {
        res.statu(404).json({msg: "Algo deu errado no seu processo de exclusao"})
    }
};


// funcao para da update na memory 

const updateMemory = async (req, res) => {
    try {

        const {title, description} = req.body;

        let src; 

        if(req.file){
            src = `images/${req.file.filename}`
        }

        const memory = await Memory.findById(req.params.id);

        if(!memory) {
            return res.statu(404).json({msg: "Memory nao encontrada"})
        }

        if(src) {
            removeOldimage(memory);
        }

        const upadateData = {};

        if(title) upadateData.title = title;
        if(description) upadateData.description = description;
        if(src) upadateData.src = src; 

        const upadateMemory = await Memory.findByIdAndUpdate(req.params.id, upadateData, {new:true})

        res.json({upadateMemory, msg: "Memoria alterada com sucesso"})
    } catch(error) {
        res.status(500).send("algo de erros no upadte")
    };

}

    const toggleFavorite = async (req, res) => {
        try {

            const memory = await Memory.findById(req.params.id)

            if(!memory) {
                return res.statu(404).json({msg: "Memoria nao encontrada"})
            }

            memory.favorite = !memory.favorite;
            await memory.save();

            res.json({msg: "adicionada aos favoritos", memory})
            
        } catch (error) {
             res.status(500).send("algo de errado ao tentar favoritar")
        }
    };

 const commentAdd = async (req, res) => {
    try {
        const {name, text} = req.body;



        if(!name || !text) {
            return res.status(404).json({msg:"Preencha todos os campos"})
        }

        const comment ={name, text};


        const memory = await Memory.findById(req.params.id);

        if(!memory) {
            return res.status(404).json({msg: "Memoria nao encontrada"});
        }

        memory.comments.push(comment);


        await memory.save();
  

        res.json({msg:"Comentario adicionado com sucesso", memory})

    } catch (error) {
      
        res.status(500).json({msg: "Algo de errado ao tentar adicionar o comentario"})
    }
}



  
    // busco ele no banco pelo id 
    // valido se esse objeto existe se nao retorno o erro 4o4 
    // pego o memory do comments e aplico o metodo push nele passando o comment assim passando por tabela os dados de name e text do user 
    // aplico o metodo save com o await para salva esse commment no BD 
    // E peco a resposta dp BD pelo Json, com a msg comentario adicionado e passando a memory 





















module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
    toggleFavorite,
    commentAdd

}