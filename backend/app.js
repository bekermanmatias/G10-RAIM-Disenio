const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const cors = require('cors');
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use('/api', indexRoutes);

app.use((req,res) =>{
    res.status(404).json({message: 'Ruta no encontrada'});
});

db.sequelize.sync()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

console.log('La aplicacion esta corriendo correctamente');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


