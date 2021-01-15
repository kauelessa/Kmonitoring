import axios from 'axios';



const api = axios.create({
  baseURL: 
  // 'http://10.0.2.2:3333/api',
  'https://kmonitoring2020dev.kuhlmann.agr.br', 

  
  headers: 
        {   'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
            // 'Content-Length':'<calculated when request is sent>',
            // 'Host':'<calculated when request is sent>',
            // 'Accept-Encoding':'gzip, deflate, br',
            // 'Connection':'keep-alive',
        },
  // timeout: 1000,
  // responseType: 'json',
  
});

export default api;