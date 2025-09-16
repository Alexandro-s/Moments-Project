import { use, useState } from 'react';
import './AddMemory.css'
import api from "../axios-config"
import useToast from '../hook/useToast';
import { useNavigate } from 'react-router-dom';
import { FaImages } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";



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

        if (event.target.name === "image") {
            setImage(event.target.files[0])
        } else {
            setInputs({ ...inputs, [event.target.name]: event.target.value })
        }

    }

    return (
        <div className="addMemory">
            <h1>Add on new Memory</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title:</p>
                    <input type="text"
                        placeholder="Enter the title"
                        name="title"
                        onChange={handleChange}
                    />
                </label>

                <label >
                    <p>Description:</p>
                    <textarea name="description"
                        placeholder="Type something"
                        onChange={handleChange}
                    >
                    </textarea>
                </label>

                <div className="btns">
                    <label for="imageUpload"
                        class="custom-upload">
                        <FaImages />

                        <input type="file"
                            id="imageUpload"
                            name="image"
                            hidden onChange={handleChange}></input>
                    </label>
                    <button type="submit" className='btn'>
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMemory;

