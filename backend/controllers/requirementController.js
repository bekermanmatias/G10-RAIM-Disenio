const { Requirement, Estado, Prioridad, TipoRequerimiento, User, CategoriaTR } = require('../models');


const createRequirement = async (req, res) => {
  const { asunto, descripcion, descEstado, descPrioridad, descTipoReq, dueno, destinatario, descCategoriaTR } = req.body;

  try {

    if(String(asunto).length >= 50){
      return res.status(400).json({message: 'Asunto excede el maximo de caracteres.'})
    }
    if(String(descripcion).length >= 5000){
      return res.status(400).json({message: 'Descripcion excede el maximo de caracteres.'})
    }

    const fechaHora = new Date();

    const tipoReq = await TipoRequerimiento.findOne({
        where: {descripcion: descTipoReq},
    });
    if(!tipoReq){
      return res.status(404).json({message: 'Tipo de requerimiento no encontrado.'});
    }
    const idTipoReq = tipoReq.idTipoReq;
  
    const codTipoReq = tipoReq.codigo; 

    const ultReq = await getReqMasReciente();
    ultReq === null ? ultCodigo = 1000000000 : ultCodigo = parseInt(ultReq.codigo.slice(-10));
    const nuevoCodigo = (ultCodigo + 1).toString().padStart(10, '0');
    console.log(codTipoReq);
    const codigo = codTipoReq + '-' + (new Date()).getFullYear() + '-' + nuevoCodigo;

    const existeCod = Requirement.findOne({
      where: {codigo},
    })
    if(!existeCod){
      return res.status(500).json({message: 'Codigo ya existente'})
    }
    const estado = await Estado.findOne({
        where: {descripcion: descEstado},
    });
    if(!estado){
      return res.status(404).json({message: 'Estado no encontrado.'});
    }
    const idEstado = estado.idEstado;

    const prioridad = await Prioridad.findOne({
        where: {descripcion: descPrioridad},
    });
    if(!prioridad){
      return res.status(404).json({message: 'Prioridad no encontrada.'});
    }
    const idPrioridad = prioridad.idPrioridad;

    const user = await User.findOne({
        where: { nombreUsuario: dueno }
    });
    if(!user){
      return res.status(404).json({message: 'Usuario dueño no encontrado.'});
    }
    const idUser = user.idUsuario;

 
    const idUserDestinatario = null;
    if(destinatario){
        const Destinatario = await User.findOne({
            where: {nombreUsuario: destinatario},
        });
      if(Destinatario){
        const idUserDestinatario = Destinatario.idUsuario;
      }else{
        return res.status(404).json({message: 'Usuario destinatario inexistente.'});
      }
    }
    if (idDestinatario && estado==='Abierto'){
      return res.status(400).json({message: 'Estado incorrecto'});
    }

    const CategoriaTR = await CategoriaTR.findOne({
      where: {descripcion: descCategoriaTR},
  });
  if(!CategoriaTR){
    return res.status(404).json({message: 'Categoria de tipo de requerimiento no encontrada.'});
  }
  const idCategoriaTR = CategoriaTR.idCategoriaTR;

    const newRequirement = await Requirement.create({ asunto, descripcion, codigo, fechaHora, idEstado, idPrioridad, idTipoReq, idUser, idUserDestinatario, idCategoriaTR });
    res.status(201).json( newRequirement);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el requerimiento', error: error.message });
  }
};

const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.findAll({
      include: [
        {
          model: Estado,
          as: 'estado',
          attributes: ['descripcion'], 
        },
        {
          model: Prioridad,
          as: 'prioridad',
          attributes: ['descripcion'], 
        },
        {
          model: TipoRequerimiento,
          as: 'tipoReq',
          attributes: ['descripcion', 'codigo'], 
        },
        {
          model: CategoriaTR,
          as: 'categoria',
          attributes: ['descripcion'],
        },
        {
          model: User,
          as: 'IdUsuarioCreador',
          attributes: ['nombre'],
        },
        {
          model:User,
          as:'UsuarioDestinatario',
          attributes:['nombre'],
        }

      ],
    });
    if(requirements.length === 0){
      return res.status(203).json({message: 'No hay requerimientos almacenados'})
    }
    res.status(200).json(requirements);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los requerimientos', error});
  }
}

const getReqByCodigo = async (req,res) => {
  const {codigo} = req.params;
  try{

    const requirement = await Requirement.findOne({
      where: {codigo: codigo},
      include: [
        {
          model: Estado,
          as: 'estado',
          attributes: ['descripcion'], 
        },
        {
          model: Prioridad,
          as: 'prioridad',
          attributes: ['descripcion'], 
        },
        {
          model: TipoRequerimiento,
          as: 'tipoReq',
          attributes: ['descripcion', 'codigo'], 
        },
      ],
    });
    if(!requirement){
      return res.status(404).json({message: 'Requerimiento no encontrado'});
    }
    res.status(201).json(requirement);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener el requerimiento.', error: error.message});
  }
    
}

const actualizarDatosReq = async (req, res) => {
  const {codigo}= req.params; 
  const datos = req.body; 

  try {
    const requeriment = await Requirement.findOne({
      where: {codigo: codigo},
    });
      if (!requeriment) {
      return res.status(404).json({ message: 'Requerimiento no encontrado.' });
    }

    Object.keys(datos).forEach((dato) => {
      if (requeriment[dato] !== undefined) {
        requeriment[dato] = datos[dato]; 
      }
    });

    await requeriment.save();
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del requerimiento', error });
  }
};

const eliminarReq = async (req, res) => {
  const {codigo} = req.params;
  
  try{
    const requirement = await Requirement.findOne({
      where: {codigo: codigo},
    });
    if (!requirement) {
      return res.status(404).json({ message: 'Requerimiento no encontrado.' });
    }
    await requirement.destroy();
    res.status(200).json({message: 'Se ha eliminado el requerimiento exitosamente'});
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el requerimiento', error: error.message});
  }
}

const getReqMasReciente = async (req, res) => {
  try {
    const reciente = await Requirement.findOne({
      order: [
        ['fechaHora', 'DESC']
      ]
    });
    return reciente;
  } catch (error) {
    res.status(500).json({message: 'Error al obtener el objeto más reciente:', error});
  }
};


module.exports = {
  createRequirement,
  getRequirements,
  getReqByCodigo,
  actualizarDatosReq,
  eliminarReq,
  getReqMasReciente
};
