//Library for load the .env file
require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
//variables to route routes
const userRoutes = require('./routes/user.js');
const cardRoutes = require('./routes/card.js');
const deckRoutes = require('./routes/deck.js');
const authUser = require('./routes/authUser.js');

const app = express();
// Agregar las cabeceras CORS

const corsOptions ={
    origin:'https://memocards-gdr5yu7xs-karim-aitt.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const port = process.env.VITE_PORT;

//conexion to db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => console.log('Conexión exitosa a MongoDB Atlas'))
.catch(error => console.error('Error al conectarse a MongoDB Atlas', error));

//middleware
//express.json() parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
app.use('/api', userRoutes)
app.use('/api', cardRoutes)
app.use('/api', authUser)
app.use('/api', deckRoutes)

//express route default
app.get('/', (req, res) => {
    res.send("API response");
})

//express listening port
app.listen(port, () => {console.log(`Server is listening on port ${port}`)});
