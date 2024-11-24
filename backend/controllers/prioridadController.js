const { Prioridad } = require('../models');


const createPrioridad = async (req, res) => {
  const {descripcion} = req.body;

  try {
    const descLibre = await Prioridad.findOne({
        where: {descripcion: descripcion},
    });
    if (descLibre || !descripcion){
        return res.status(400).json({ message: 'Descripcion no disponible'});
    }

    const newPrioridad = await Prioridad.create({ descripcion });
    res.status(201).json(newPrioridad);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la prioridad', error: error.message });
  }
};

const getPrioridades = async (req, res) => {
  try {
    const prioridades = await Prioridad.findAll();
    res.status(200).json(prioridades);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener las prioridades', error});
  }
}

const getPrioByDesc = async (req,res) => {
  const {descripcion} = req.body;
  try{
    
    const prioridad = await Prioridad.findOne({
      where: {descripcion: descripcion},
    });
    if (!prioridad) {
      return res.status(404).json({ message: 'Prioridad no encontrada' });
    }
    res.status(200).json(prioridad);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener prioridad', error: error.message});
  }
    
}


const eliminarPrioridad = async (req, res) => {
  const {descripcion} = req.body;
  
  try{
    const prioridad = await Prioridad.findOne({
      where: {descripcion: descripcion},
    });
    if (!prioridad) {
      return res.status(404).json({ message: 'Prioridad no encontrada' });
    }
    await prioridad.destroy();
    res.status(200).json({ message: 'Prioridad eliminada'})
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar prioridad', error});
  }
}

module.exports = {
  createPrioridad,
  getPrioridades,
  getPrioByDesc,
  eliminarPrioridad
};
