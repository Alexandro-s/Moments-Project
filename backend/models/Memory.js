const mongoose = require("mongoose")
const Schema = mongoose.Schema;



// 1 schema para os comentearios - e outra para a aplicacao em si, 
// para a schema de comentaios - name e text ambos do tipo string 

// para a schemaMemory preciso de mais dados - title - src - description - favorite - comments - 

// tambem vou precisar de um modo de observar data e hora dos commments entao vou usar o timestamps para que o banco salve as datas de criacao e edicao do user. 

// MVC

const commentSchema = new Schema ({
    name: {
        type: String,
         required: true
    },
    text: {
        type: String,
        required: true
    }
});


const MemorySchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    src: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        
    },
    comments: {
        type: [commentSchema]
    },   
}, {timestamps: true});


module.exports = mongoose.model("Memory", MemorySchema)