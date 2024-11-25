const { CategoriaReq } = require('../models');
const { Op } = require('sequelize');

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Validaciones
        if (!nombre) {
            return res.status(400).json({ 
                message: 'El nombre de la categoría es obligatorio' 
            });
        }

        // Verificar si ya existe una categoría con ese nombre
        const categoriaExistente = await CategoriaReq.findOne({ 
            where: { nombre: nombre.trim() } 
        });

        if (categoriaExistente) {
            return res.status(400).json({ 
                message: 'Ya existe una categoría con este nombre' 
            });
        }

        // Crear nueva categoría
        const nuevaCategoria = await CategoriaReq.create({
            nombre: nombre.trim()
        });

        res.status(201).json({
            message: 'Categoría creada exitosamente',
            categoria: nuevaCategoria
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
    }
};

exports.obtenerTodasCategorias = async (req, res) => {
    try {
        // Obtener parámetros de paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Buscar categorías con paginación
        const { count, rows: categorias } = await CategoriaReq.findAndCountAll({
            limit,
            offset,
            order: [['idCategoriaReq', 'DESC']]
        });

        res.status(200).json({
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            categorias
        });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
    }
};

exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar categoría por ID
        const categoria = await CategoriaReq.findByPk(id);

        // Verificar si la categoría existe
        if (!categoria) {
            return res.status(404).json({ 
                message: 'Categoría no encontrada' 
            });
        }

        res.status(200).json(categoria);
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
    }
};

exports.eliminarCategoria = async (req, res) => {
    const transaction = await CategoriaReq.sequelize.transaction();

    try {
        const { id } = req.params;

        // Verificar si la categoría existe
        const categoria = await CategoriaReq.findByPk(id, { transaction });

        if (!categoria) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: 'Categoría no encontrada' 
            });
        }

        // Verificar si la categoría tiene requerimientos asociados
        const requerimientosAsociados = await categoria.countRequerimientos({ transaction });

        if (requerimientosAsociados > 0) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: `No se puede eliminar. Hay ${requerimientosAsociados} requerimientos asociados a esta categoría` 
            });
        }

        // Eliminar categoría
        await categoria.destroy({ transaction });
        await transaction.commit();

        res.status(200).json({ 
            message: 'Categoría eliminada exitosamente' 
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
    }
};

exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Verificar si la categoría existe
        const categoria = await CategoriaReq.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ 
                message: 'Categoría no encontrada' 
            });
        }

        // Validaciones
        if (nombre) {
            // Verificar si el nuevo nombre ya existe
            const categoriaExistente = await CategoriaReq.findOne({ 
                where: { 
                    nombre: nombre.trim(),
                    idCategoriaReq: { [Op.ne]: id } 
                } 
            });

            if (categoriaExistente) {
                return res.status(400).json({ 
                    message: 'Ya existe una categoría con este nombre' 
                });
            }
        }

        // Actualizar categoría
        await categoria.update({
            nombre: nombre ? nombre.trim() : categoria.nombre
        });

        res.status(200).json({ 
            message: 'Categoría actualizada exitosamente',
            categoria: categoria
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
    }
};