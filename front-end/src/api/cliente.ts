//sera utilizado quando tiver um backend real

import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000', // se a variável de ambiente VITE_API_URL estiver definida, use-a como baseURL; caso contrário, use 'http://localhost:3000' como padrão
});

