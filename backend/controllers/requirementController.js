const { Requirement, Estado, Prioridad, TipoRequerimiento, User, CategoriaReq  } = require('../models');
const categoriatr = require('../models/categoriatr');


const createRequirement = async (req, res) => {
  const { asunto, descripcion, descPrioridad, descTipoReq, dueno, destinatario, nombreCategoria } = req.body;

  try {
    // Validaciones de longitud
    if(String(asunto).length >= 50){
      return res.status(400).json({message: 'Asunto excede el maximo de caracteres.'})
    }
    if(String(descripcion).length >= 5000){
      return res.status(400).json({message: 'Descripcion excede el maximo de caracteres.'})
    }

    const fechaHora = new Date();

    // Validar y obtener tipo de requerimiento
    const tipoReq = await TipoRequerimiento.findOne({
        where: {descripcion: descTipoReq},
    });
    if(!tipoReq){
      return res.status(404).json({message: 'Tipo de requerimiento no encontrado.'});
    }
    const idTipoReq = tipoReq.idTipoReq;
    const codTipoReq = tipoReq.codigo; 

    // Generar código de requerimiento
    const ultReq = await getReqMasReciente();
    const ultCodigo = ultReq === null ? 1000000000 : parseInt(ultReq.codigo.slice(-10));
    const nuevoCodigo = (ultCodigo + 1).toString().padStart(10, '0');
    const codigo = codTipoReq + '-' + (new Date()).getFullYear() + '-' + nuevoCodigo;

    // Verificar código único
    const existeCod = await Requirement.findOne({
      where: {codigo},
    });
    if(existeCod){
      return res.status(500).json({message: 'Codigo ya existente'})
    }

    // Validar prioridad
    const prioridad = await Prioridad.findOne({
        where: {descripcion: descPrioridad},
    });
    if(!prioridad){
      return res.status(404).json({message: 'Prioridad no encontrada.'});
    }
    const idPrioridad = prioridad.idPrioridad;

    // Validar usuario creador
    const user = await User.findOne({
        where: { nombreUsuario: dueno }
    });
    if(!user){
      return res.status(404).json({message: 'Usuario dueño no encontrado.'});
    }
    const idUser = user.idUsuario;

    // Manejar destinatario y estado
    let idDestinatario = null;
    let estadoFinal = 1; // Por defecto "Abierto"

    if(destinatario){
        const userD = await User.findOne({
            where: {nombreUsuario: destinatario},
        });
        if(userD){
            idDestinatario = userD.idUsuario;
            estadoFinal = 2; // "Asignado"
        } else {
            return res.status(404).json({message: 'Usuario destinatario no encontrado'});
        }
    }

    // Buscar la categoría por nombre
    const categoria = await CategoriaReq.findOne({
      where: { nombre: nombreCategoria },
    });

    if (!categoria) {
      return res.status(404).json({ 
        message: 'Categoría no encontrada.',
        detalles: `No existe una categoría con el nombre: ${nombreCategoria}`
      });
    }

    const idCategoriaReq = categoria.idCategoriaReq;

    // Crear requerimiento
    const newRequirement = await Requirement.create({ 
      asunto, 
      descripcion, 
      codigo, 
      fechaHora, 
      idEstado: estadoFinal, 
      idPrioridad, 
      idTipoReq, 
      idUser, 
      idDestinatario, 
      idCategoriaReq 
    });

    res.status(201).json(newRequirement);
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
          model: CategoriaReq,  // Cambié CategoriaTR por CategoriaReq
          as: 'categoria',
          attributes: ['nombre'],  // Cambié 'descripcion' por 'nombre'
        },
        {
          model: User,
          as: 'idUsuarioCreador', 
          attributes: ['nombreUsuario', 'nombre']
        },
        {
          model: User,
          as: 'UsuarioDestinatario', 
          attributes: ['nombreUsuario', 'nombre']
        }
      ],
    });
    
    if(requirements.length === 0){
      return res.status(203).json({message: 'No hay requerimientos almacenados'})
    }
    
    res.status(200).json(requirements);
  }
  catch (error){
    res.status(500).json({ message: 'Error al obtener los requerimientos', error});
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
        {
          model: CategoriaReq,  
          as: 'categoria',
          attributes: ['nombre'], 
        },
        {
          model: User,
          as: 'idUsuarioCreador', 
          attributes: ['nombreUsuario', 'nombre']
        },
        {
          model: User,
          as: 'UsuarioDestinatario', 
          attributes: ['nombreUsuario', 'nombre']
        }
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
