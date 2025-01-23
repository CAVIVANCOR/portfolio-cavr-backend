
const express = require('express');
const cors = require('cors');
const emailEnvio = require('./emailEnvio.js');
const app = express();
app.use(express.json());

// Configurar CORS para permitir acceso a todo
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    exposedHeaders: 'Content-Type, Accept, Authorization'
  }));
  
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send-email', async (req, res) => {
    console.log(req.body);
    const{name,from,subject,phone,text} = req.body;
    try {
        let data = await emailEnvio(name,from,subject,phone,text);
        console.log(data);
        res.status(200).send(`Email enviado OK: ${data.response}`);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        throw error;
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
