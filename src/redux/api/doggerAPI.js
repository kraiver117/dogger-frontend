import axios from 'axios';

export const doggerAPI = axios.create({
    baseURL: 'https://dogger117-api.herokuapp.com/api'
});