const { User, Departamento } = require('../models');


const createUser = async (req, res) => {
  const { nombre, nombreUsuario, password, email, cargo, legajo, nombreDepartamento } = req.body;

  try {
    const departamento = await Departamento.findOne({
        where: {nombre: nombreDepartamento},
    });

    const idDepartamento = departamento.idDepartamento;

    if (!departamento){
        return res.status(404).json({ message: 'Departamento no encontrado.'})
    }
    const newUser = await User.create({ nombre, nombreUsuario, password, email, cargo, legajo, idDepartamento});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};


module.exports = {createUser};
