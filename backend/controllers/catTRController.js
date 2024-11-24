const { CategoriaTR, TipoRequerimiento } = require('../models');


const createCatTR = async (req, res) => {
  const {descripcion, codTR} = req.body;

  try {
    const descLibre = await CategoriaTR.findOne({
        where: {descripcion: descripcion},
    });
    if (descLibre){
        return res.status(400).json({ message: 'Descripcion no disponible'});
    }

    const TipoReq = await TipoRequerimiento.findOne({
      where: {codigo: codTR},
    });
    if(!TipoReq){
      return res.status(404).json({message: 'Tipo de requerimiento no encontrado'})
    }
    const idTipoReq = TipoReq.idTipoReq;

    const newCatTR = await CategoriaTR.create({ descripcion, idTipoReq });
    res.status(201).json(newCatTR);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoria', error: error.message });
  }
};

const getCatTR = async (req, res) => {
  try {
    const catsTR = await CategoriaTR.findAll();
    res.status(200).json(catsTR);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener las categorias', error});
  }
}

const getCatByDesc = async (req,res) => {
  const {descripcion} = req.body;
  try{
    
    const catTR = await CategoriaTR.findOne({
      where: {descripcion: descripcion},
    });
    if (!catTR) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.status(200).json(catTR);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener la categoria.', error: error.message});
  }
    
}


const eliminarCat = async (req, res) => {
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
  createCatTR,
  getCatTR,
  getCatByDesc,
  eliminarCat
};
