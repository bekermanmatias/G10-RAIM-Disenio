const { Requirement, Estado, Prioridad, TipoRequerimiento, User } = require('../models');


const createRequirement = async (req, res) => {
  const { asunto, descEstado, descPrioridad, descTipoReq, dueño, destinatario } = req.body;

  try {
    const fechaHora = new Date();

    const tipoReq = await TipoRequerimiento.findOne({
        where: {descripcion: descTipoReq},
    });
    const idTipoReq = tipoReq.idTipoReq;

    const codTipoReq = tipoReq.codigo; 

    const ultReq = getReqMasReciente();
    const ultCodigo = (ultReq.codigo).slice(-10);
    if(!ultCodigo){
        ultCodigo = 1000000000 ;
    };
    const codigo = codTipoReq + '-' + (new Date()).getFullYear() + '-' + ultCodigo+1;

    const estado = await Estado.findOne({
        where: {descripcion: descEstado},
    });
    const idEstado = estado.idEstado;

    const prioridad = await Prioridad.findOne({
        where: {descripcion: descPrioridad},
    });
    const idPrioridad = prioridad.idPrioridad;

    const user = await User.findOne({
        where: {nombreUsuario: dueño},
    });
    const idUser = user.idUsuario;

    if(!destinatario){
        const userD = await User.findOne({
            where: {nombreUsuario: destinatario},
        });
        const idDestinatario = userD.idUsuario;
    }else{
        const idDestinatario = null;
    }

    const newRequirement = await Requirement.create({ asunto, codigo, fechaHora, idEstado, idPrioridad, idTipoReq, idUser, idDestinatario });
    res.status(201).json( newRequirement);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el requerimiento', error });
  }
};

const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.findAll();
    res.status(200).json(requirements);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los requerimientos', error});
  }
}

const getReqByCodigo = async (req,res) => {
  const codigo = req.params;
  try{
    if (!codigo){
      res.status(404).json({ mmessage: 'Se debe ingresar un codigo de requerimiento.'});
    }

    const requeriment = await Requirement.findOne({
      where: {codigo: codigo},
    });
    res.status(201).json(requeriment);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener el requerimiento.'});
  }
    
}

const actualizarDatosReq = async (req, res) => {
  const { codigo } = req.params; 
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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del requerimiento', error });
  }
};

const eliminarReq = async (req, res) => {
  const { codigo } = req.params;
  
  try{
    const requeriment = await Requirement.findOne({
      where: {codigo: codigo},
    });
    if (!requeriment) {
      return res.status(404).json({ message: 'Requerimiento no encontrado.' });
    }
    await requeriment.destroy();
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el usuario', error});
  }
}

const getReqMasReciente = async () => {
  try {
    const reciente = await Requirement.findOne({
      order: [
        ['fechaHora', 'DESC'] // Ordena por fechaHora de manera descendente
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
  eliminarReq
};
