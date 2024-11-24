const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const app = express();
const routes = require('./routes/indexRoutes');



// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);


app.use((req,res) =>{
    res.status(404).json({message: 'Ruta no encontrada'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


