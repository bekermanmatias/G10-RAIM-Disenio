const { TipoRequerimiento } = require('../models');


const createTipoReq = async (req, res) => {
  const { codigo, descripcion } = req.body;

  try {
    
    if( String(codigo).length !== 3){
        return res.status(400).json({message: 'El codigo debe tener 3 caracteres.'})
    }
    
    const codExiste = await TipoRequerimiento.findOne( { where: {codigo: codigo} });
    if (codExiste){
      return res.status(400).json( { message: 'El codigo del tipo ya esta utilizado.'})
    }
    const newTipoReq= await TipoRequerimiento.create({codigo, descripcion});
    return res.status(201).json(newTipoReq);
  } catch (error) {
     res.status(500).json({ message: 'Error al crear el tipo de requerimiento', error: error.message});
  }
};  


const getTiposReq = async (req, res) => {
  try {
    const tiposReq = await TipoRequerimiento.findAll();
    res.status(200).json(tiposReq);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los tipos de requerimientos', error});
  }
}

const getTipoByCodigo = async (req,res) => {
  const { codigo } = req.params;
  try{

    const TipoReq = await TipoRequerimiento.findOne({
      where: {codigo: codigo},
    });
    if (!TipoReq){
      return res.status(404).json({message: 'Tipo de requerimiento no encontrado'})
    }
    res.status(200).json(TipoReq);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener el tipo de requerimiento.', error: error.message});
  }
    
}


const eliminarTipoReq = async (req, res) => {
  const { codigo } = req.params;
  
  try{
    const TipoReq = await TipoRequerimiento.findOne({
      where: {codigo: codigo},
    });
    if (!TipoReq) {
      return res.status(404).json({ message: 'Tipo de requerimiento no encontrado' });
    }
    await TipoReq.destroy();
    res.status(200).json({meesage: 'Tipo de requerimiento eliminado con exito.'})
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el tipo de requerimiento', error: error.message});
  }
}

module.exports = {
  createTipoReq,
  getTiposReq,
  getTipoByCodigo,
  eliminarTipoReq
};
