const { TipoReq, categoriaTR} = require('../models');


const createTipoReq = async (req, res) => {
  const { codigo, descripcion, descCTR } = req.body;

  try {
    if(codigo.length() !== 3){
        res.status(500).json({message: 'El codigo debe tener 3 caracteres.'})
    }

    const CategoriaTR = await categoriaTR.findOne({
        where: {descripcion: descCTR},
    });

    if (!CategoriaTR){
        return res.status(404).json({ message: 'Categoria no encontrada.'});
    }else{
        const idCategoriaTR = categoriaTR.idCategoriaTR;
    }
    const newTipoReq = await TipoReq.create({ codigo, descripcion, idCategoriaTR });
    res.status(201).json(newTipoReq);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tipo de requerimiento', error });
  }
};

const getTiposReq = async (req, res) => {
  try {
    const tiposReq = await TipoReq.findAll();
    res.status(200).json(tiposReq);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los tipos de requerimientos', error});
  }
}

const getTipoByCodigo = async (req,res) => {
  const Cod = req.params;
  try{
    if (!Cod){
      res.status(404).json({ mmessage: 'Se debe ingresar un codigo'});
    }

    const TipoR = await TipoReq.findOne({
      where: {codigo: Cod},
    });
    res.status(201).json(TipoR);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener el tipo de requerimiento.'});
  }
    
}


const eliminarTipoReq = async (req, res) => {
  const { Cod } = req.params;
  
  try{
    const TipoReq = await TipoReq.findOne({
      where: {codigo: Cod},
    });
    if (!TipoReq) {
      return res.status(404).json({ message: 'Tipo de requerimiento no encontrado' });
    }
    await TipoReq.destroy();
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el tipo de requerimiento', error});
  }
}

module.exports = {
  createTipoReq,
  getTiposReq,
  getTipoByCodigo,
  eliminarTipoReq
};
