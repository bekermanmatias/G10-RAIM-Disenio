const { Estado } = require('../models');


const createState = async (req, res) => {
  const {descripcion} = req.body;

  try {
    const descLibre = await Estado.findOne({
        where: {descripcion: descripcion},
    });
    if (descLibre || !descripcion){
        return res.status(400).json({ message: 'Descripcion no disponible'});
    }

    const newEstado = await Estado.create({ descripcion });
    res.status(201).json(newEstado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el estado', error: error.message });
  }
};

const getStates = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.status(200).json(estados);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los estados', error});
  }
}

const getStateByDesc = async (req,res) => {
  const {descripcion} = req.body;
  try{
    
    const estado = await Estado.findOne({
      where: {descripcion: descripcion},
    });
    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }
    res.status(200).json(estado);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener estado', error: error.message});
  }
    
}


const eliminarState = async (req, res) => {
  const {descripcion} = req.body;
  
  try{
    const estado = await Estado.findOne({
      where: {descripcion: descripcion},
    });
    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }
    await estado.destroy();
    res.status(200).json({ message: 'Estado eliminado'})
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el estado', error});
  }
}

module.exports = {
  createState,
  getStates,
  getStateByDesc,
  eliminarState
};
