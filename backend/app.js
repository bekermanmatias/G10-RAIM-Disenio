const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();
const routes = require('./routes/indexRoutes');

// Middleware
app.use(bodyParser.json());
app.use('/api', routes);

app.use((req,res) =>{
    res.status(404).json({message: 'Ruta no encontrada'});
});

//db.sequelize.sync()
//   .then(() => {
//       console.log('Database connected successfully');
//   })
//   .catch(err => {
//       console.error('Error connecting to database:', err);
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


