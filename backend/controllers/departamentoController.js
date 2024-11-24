const { Departamento } = require('../models');


const createDepart = async (req, res) => {
  const {nombre} = req.body;

  try {
    const nombreLibre = await Departamento.findOne({
        where: {nombre: nombre},
    });
    if (nombreLibre){
        return res.status(400).json({ message: 'Nombre no disponible'});
    }

    const newDepart = await Departamento.create({ nombre });
    res.status(201).json(newDepart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el departamento', error: error.message });
  }
};

const getDeparts = async (req, res) => {
  try {
    const departs = await Departamento.findAll();
    res.status(200).json(departs);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los departamentos', error});
  }
}

const getDepartByNom = async (req,res) => {
  const {nombre} = req.body;
  try{
    
    const depart = await Departamento.findOne({
      where: {nombre: nombre},
    });
    if (!depart) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json(depart);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener departamento', error: error.message});
  }
    
}


const eliminarDepart = async (req, res) => {
  const {descripcion} = req.body;
  
  try{
    const catTR = await CategoriaTR.findOne({
      where: {descripcion: descripcion},
    });
    if (!catTR) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    await catTR.destroy();
    res.status(200).json({ message: 'Categoria eliminada'})
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar la categoria', error});
  }
}

module.exports = {
  createDepart,
  getDeparts,
  getDepartByNom,
  eliminarDepart
};
