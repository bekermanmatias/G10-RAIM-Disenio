const { ArchivoAdjunto, Requirement, Comentario } = require('../models');
const upload = require('../config/multerConfig');
const fs = require('fs').promises;
const path = require('path');

const createAA = async (req, res) => {
    const {idReq, idCom} = req.body;
    if (!req.file){
      return res.status(400).json({ message: 'No se ha subido ningun archivo' })
    }

    const url = `/uploads/${req.file.filename}`
    try {
      const urlNoRepite = await ArchivoAdjunto.findOne({
          where: {url: url},
      });
      if (urlNoRepite){
          return res.status(400).json({ message: 'Datos incosistentes'});
      }
      if (idReq){
        const requerimiento = await Requirement.findOne({
          where: {codigo: idReq}
        })
      }
      idReq = requerimiento.idRequerimiento || null;
      
      if (idCom){
        const comentario = Comentario.findOne({
          where: {idComentario: idCom}
        })
      }
      const idCom = comentario.idComentario || null;

      const newAA = await ArchivoAdjunto.create({
        ext: path.extname(req.file.originalname),
        peso: req.file.size,
        url: `/uploads/${req.file.filename}`,
        idReq: idReq,
        idCom: idCom
      });
      res.status(201).json(newAA);
    } catch (error) {
      res.status(500).json({ message: `Error al subir el archivo adjunto: ${error.message}` });
    }
  };

  const getArcAByReq = async (req, res) => {
    const {idReq} = req.body;
    try{
      if (idReq){
        const requerimiento = await Requirement.findOne({
          where: {codigo: idReq}
        })
      }
      const idReq = requerimiento.idRequerimiento || null;
      
      const ArcA = await ArchivoAdjunto.findAll({
        where: {idReq: idReq},
      });
      if (!ArcA.length) {
        return res.status(200).json([]);
      }
      res.status(200).json(ArcA);
    }
    catch (error){
      res.status(500).json({ message: `No se encontraron archivos adjuntos: ${error.message}` });
    }
}

const getArcAByCom = async (req, res) => {
    const {idCom} = req.body;
    try{
      if (idCom){
        const comentario = Comentario.findOne({
          where: {idComentario: idCom}
        })
      }
      const idCom = comentario.idComentario || null;
      const ArcA = await ArchivoAdjunto.findAll({
        where: {idCom: idCom},
      });
      if (!ArcA) {
        return res.status(200).json([]);
      }
      res.status(200).json(ArcA);
    }
    catch (error){
      res.status(500).json({ message: `Error al obtener archivos adjuntos: ${error.message}` });
    }
}

const getAAByUrl = async (req, res) => {
  const { url } = req.params;
  try {
    const ArcA = await ArchivoAdjunto.findOne({
      where: { url: url },
    });

    if (!ArcA) {
      return res.status(404).json({ message: 'Archivo adjunto no encontrado' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', path.basename(ArcA.url));

    await fs.access(filePath);

    return res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al enviar el archivo', error: err.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener el archivo adjunto: ${error.message}` });
  }
};


  const eliminarArcA = async (req, res) => {
    const { url } = req.body;
    
    try {

        const ArcA = await ArchivoAdjunto.findOne({ where: { url } });
        if (!ArcA) {
            return res.status(404).json({ message: 'Archivo adjunto no encontrado.' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', path.basename(ArcA.url));
        
        try {
          await fs.unlink(filePath);
        }
        catch (err){
          console.error('Error al eliminar el archivo:', err);
          return res.status(500).json({ message: 'Error al eliminar el archivo físico' });
        };

            await ArcA.destroy();
            res.status(200).json({ message: 'Archivo adjunto eliminado' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el archivo adjunto', error });
    }
};

  module.exports = {
    createAA,
    getArcAByReq,
    getArcAByCom,
    getAAByUrl,
    eliminarArcA
  };