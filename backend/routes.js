const express = require("express");

const router = express.Router();


// Chamar o o uploads 
const upload= require("./helpers/upload")

// Dentro do post entre a a barra e as requisicoes vamos executar alguns midwares - 

// single - e outro campo para validacao ou seja checar se a imagem veio. 
// 

const {
     createMemory,
     getMemories,
     getMemory,
     deleteMemory,
     updateMemory,
     toggleFavorite,
     commentAdd
} = require("./controllers/MemoryControllers")

router.post("/",upload.single("image"), (req, res, next) => {
     const image = req.file;

     if(!image) {
          return res.status(400).json({msg: "envie um arquivo"})
     }

     next()

 },
 (req, res) =>  createMemory(req, res)
)


// Vamos passar a rota get 
// ela recebe o router recebe o verbo a que se sujeita, nesse caso o GET e recebe sua rota, para o get / apos e isso uma uma arrow com req e res que vai receber a propria funcao getMemories com seus req e res. 

router.get("/", (req, res) => getMemories(req,  res));

// A rota de get individual segue o mesmo modelo da de get padrao, com a resalva que o caminho dela rota recebe uma argumento dinamico, este sendo o id :id
router.get("/:id", (req, res) => getMemory(req, res));

router.delete("/:id", (req, res) => deleteMemory(req, res));

// Rota do upadteMemory patch vou aplicar o metodo upload single na imagem para atualizar ela se for precido 
router.patch("/:id", upload.single("image"), (req, res) => updateMemory(req, res));

// Rotas dos favoritos
router.patch("/favorite/:id", (req, res) => toggleFavorite(req, res));

// Rota de commment 
router.patch("/:id/comment", (req, res) => commentAdd(req, res));


module.exports = router;