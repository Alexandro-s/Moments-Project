import axios from "axios";


const api = axios.create ({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "aplication/json"
    },
    timeout: 1000

});

// axios.defaults.baseURL = "http://localhost:3000/"
// axios.defaults.headers.post['Content-Type'] = "aplication/json"
// axios.defaults.timeout = 10000;


export default api;
