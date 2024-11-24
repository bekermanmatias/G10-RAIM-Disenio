const { categoriaTR } = require('../models');


const createCatTR = async (req, res) => {
  const { descripcion } = req.body;

  try {
    const descLibre = await categoriaTR.findOne({
        where: {descripcion: descripcion},
    });

    if (descLibre){
        return res.status(404).json({ message: 'Categoria con misma descripcion existente!'});
    }
    const newCatTR = await categoriaTR.create({ descripcion });
    res.status(201).json(newCatTR);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoria', error });
  }
};

const getCatTR = async (req, res) => {
  try {
    const catsTR = await categoriaTR.findAll();
    res.status(200).json(catsTR);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener las categorias', error});
  }
}

const getCatByDesc = async (req,res) => {
  const Desc = req.params;
  try{
    if (!Desc){
      res.status(404).json({ mmessage: 'Se debe enviar una descripcion.'});
    }

    const catTR = await categoriaTR.findOne({
      where: {descripcion: Desc},
    });
    res.status(201).json(catTR);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener la categoria.'});
  }
    
}


const eliminarCat = async (req, res) => {
  const { Desc } = req.params;
  
  try{
    const catTR = await User.findOne({
      where: {descripcion: Desc},
    });
    if (!catTR) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    await catTR.destroy();
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar la categoria', error});
  }
}

module.exports = {
  createCatTR,
  getCatTR,
  getCatByDesc,
  eliminarCat
};
