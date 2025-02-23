const { Requirement, User, Comentario } = require('../models');

const createComment = async (req, res) => {
  const { asunto, descripcion, fechaHora, emisor, codReq } = req.body;

  try {
      if (String(asunto).length >= 50) {
          return res.status(400).json({ message: 'Asunto excede el maximo de caracteres.' });
      }
      if (String(descripcion).length >= 5000) {
          return res.status(400).json({ message: 'Descripcion excede el maximo de caracteres.' });
      }
      const fechaHora = new Date();
      const emisor = await User.findOne({
          where: { nombreUsuario: emisor },
      });
      if (!emisor) {
        return res.status(404).json({ message: 'Usuario emisor no encontrado.' });
    }
    const idUser  = emisor.idUsuario;
      const reqRelacionado = await Requirement.findOne({
        where: { codigo: codReq },
    });
        const idReq = reqRelacionado.idRequerimiento;

      const newComentario = await Comentario.create({ asunto, descripcion, fechaHora, idUser, idReq });
      res.status(201).json(newComentario);
  } catch (error) {
      res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
  }
};

const getCommentsByCodReq = async (req, res) => {
    const codigo = req.params;
  try {

    const Comments = await Requirement.findAll({
        where: { idComentario: codigo },
      include: [
        {
          model: Requirement,
          as: 'Requerimientos',
          attributes: ['codigo'], 
        },
        {
          model: User,
          as: 'UsuarioEmisor',
          attributes: ['nombre'], 
        }
      ],
    });

    if(rows.length === 0){
      return res.status(203).json({message: 'No hay comentarios almacenados'})
    }

    res.status(200).json(Comments);
    
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los comentarios', error: error.message});
  }
}

const actualizarDatosComentario = async (req, res) => {
  const {codigo}= req.params; 
  const datos = req.body; 

  try {
    const comentario = await Requirement.findOne({
      where: {idComentario: codigo},
    });
      if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado.' });
    }

    Object.keys(datos).forEach((dato) => {
      if (comentario[dato] !== undefined) {
        comentario[dato] = datos[dato]; 
      }
    });

    await comentario.save();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del comentario', error });
  }
};

const eliminarComment = async (req, res) => {
  const {codigo} = req.params;
  
  try{
    const comentario = await Comentario.findOne({
      where: {idComentario: codigo},
    });
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado.' });
    }
    await comentario.destroy();
    res.status(200).json({message: 'Se ha eliminado el comentario exitosamente'});
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message});
  }
}

module.exports = {
  createComment,
  getCommentsByCodReq,
  actualizarDatosComentario,
  eliminarComment,
};
