import axios from 'axios'

const instate = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export default instate