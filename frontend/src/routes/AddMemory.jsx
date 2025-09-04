import { use, useState } from 'react';
import './AddMemory.css'
import api from "../axios-config"
import useToast from '../hook/useToast';
import { useNavigate } from 'react-router-dom';



const AddMemory = () => {
    const [inputs, setInputs] = useState(null);
    const [image, setImage] = useState(null);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();


        // Como estou enviado e recebendo o objeto como formDate preciso fazer meu obj baseada nisso

        const formData = new FormData();

        formData.append("title", inputs.title);
        formData.append("description", inputs.description);
        formData.append("image", image);


        // Agr vamos tentar fazer a requisicao
try {
     const response = await api.post("/memories", formData, {
            headers: {
            "Content-Type": "multipart/form-data"
    }
        });

        if (response.status === 200) {
            useToast(response.data.msg);
            navigate("/");
        }
} catch (error) {

    useToast(error.response?.data?.msg);
        
    
}
       
    }

    const handleChange = (event) => {

     if(event.target.name === "image") {
        setImage(event.target.files[0])
     } else {
        setInputs({...inputs,[event.target.name]: event.target.value})
     }

    }

    
    return (
        <div className="addMemory">
            <h2>Add on new Memory</h2>
            <form  onSubmit={handleSubmit}>
                <label>
                    <p>Title:</p>
                    <input type="text" 
                    placeholder="Digite o titulo"
                    name="title"
                    onChange={handleChange}
                    />
                </label>
                   
                <label >
                     <p>Description:</p>
                    <textarea name="description" 
                    placeholder="Digite algo"
               onChange={handleChange}
                    >
                    </textarea>
                </label>
                <label>
                    <p>Image:</p>
                    <input 
                    type="file"
                    name="image"
                onChange={handleChange}
                    />
                </label>
                <input type="submit" className="btn" value="submit"/>
            </form>
            
        </div>
    )
}

export default AddMemory;


// addMemory.jsx 
//     Dentro do addMemory {
//         Criar formulario {
//             Campos {
//                 title {
//                     label
//                      uma tag p
//                        inpunt {
//                         type,
//                         placeholder,
//                         name
//                        }  

//                 } Description {
//                     label,
//                     p
//                     textarea
//                     name
//                     placeholder
//                 } image {
//                     label
//                     p
//                     inpunt
//                     type
//                     name


//                 } boton (Que e uma inpunt do tipo sunmit) {
//                     type
//                     className(btn) value de submit
//                 }

//             }
//         }

//     }
// }