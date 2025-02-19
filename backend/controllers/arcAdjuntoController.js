const { ArchivoAdjunto, Requirement, Comentario } = require('../models');
const archivoAdjunto = require('../models/archivoAdjunto');

const createAA = async (req, res) => {
    const {ext, peso, url, idReq, idCom} = req.body;
  
    try {
      const urlNoRepite = await archivoAdjunto.findOne({
          where: {url: url},
      });
      if (urlNoRepite){
          return res.status(400).json({ message: 'Datos incosistentes'});
      }
      if (!idReq) {
        idReq === 0;
      }
      if (!idCom) {
        idCom === 0;
      }
      const newAA = await ArchivoAdjunto.create({ ext, peso, url, idReq, idCom});
      res.status(201).json(newAA);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el archivo adjunto', error: error.message });
    }
  };

  const getArcAByReq = async (req, res) => {
    const {idReq} = req.body;
    try{
      
      const ArcA = await ArchivoAdjunto.findOne({
        where: {idReq: idReq},
      });
      if (!ArcA) {
        return res.status(404).json({ message: 'Archivo adjunto no encontrado' });
      }
      res.status(200).json(ArcA);
    }
    catch (error){
      res.status(500).json({message: 'Error al obtener el archivo adjunto: ', error: error.message});
    }
}

const getArcAByCom = async (req, res) => {
    const {idCom} = req.body;
    try{
      const ArcA = await ArchivoAdjunto.findOne({
        where: {idCom: idCom},
      });
      if (!ArcA) {
        return res.status(404).json({ message: 'Archivo adjunto no encontrado' });
      }
      res.status(200).json(ArcA);
    }
    catch (error){
      res.status(500).json({message: 'Error al obtener el archivo adjunto: ', error: error.message});
    }
}

  const getAAByUrl = async (req,res) => {
    const {url} = req.body;
    try{
      
      const ArcA = await ArchivoAdjunto.findOne({
        where: {url: url},
      });
      if (!ArcA) {
        return res.status(404).json({ message: 'Archivo adjunto no encontrado' });
      }
      res.status(200).json(ArcA);
    }
    catch (error){
      res.status(500).json({message: 'Error al obtener el archivo adjunto: ', error: error.message});
    }
  }

  const eliminarArcA = async (req, res) => {
    const {url} = req.body;
    
    try{
      const ArcA = await ArchivoAdjunto.findOne({
        where: {url: url},
      });
      if (!ArcA) {
        return res.status(404).json({ message: 'Archivo adjunto no encontrado.' });
      }
      await catTR.destroy();
      res.status(200).json({ message: 'Archivo adjunto eliminado'})
    }
    catch(error){
      res.status(500).json({ message: 'Error al eliminar el archivo adjunto: ', error});
    }
  }

  module.exports = {
    createAA,
    getArcAByReq,
    getArcAByCom,
    getAAByUrl,
    eliminarArcA
  };