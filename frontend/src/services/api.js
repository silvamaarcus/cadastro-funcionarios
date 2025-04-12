import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cadastro-funcionarios-production.up.railway.app',
});

export default api;