const multer = require("multer");
const path = require("path");

// criar o storage para guardar as imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Criar o fileFilter para tratar e filtrar o tipo das imagens
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Invocar o multer passando as funções criadas
const upload = multer({
    storage,
    fileFilter 
});

module.exports = upload;
