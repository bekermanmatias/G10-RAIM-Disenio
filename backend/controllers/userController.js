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

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  }
  catch (error){
    res.status(500).json( { message: 'Error al obtener los usuarios', error});
  }
}

const getUserByUsername = async (req,res) => {
  const username = req.params;
  try{
    if (!username){
      res.status(404).json({ mmessage: 'Se debe enviar un nombre de usuario.'});
    }

    const user = await User.findOne({
      where: {nombreUsuario: username},
    });
    res.status(201).json(user);
  }
  catch (error){
    res.status(500).json({message: 'Error al obtener el usuario.'});
  }
    
}

const actualizarDatosUser = async (req, res) => {
  const { username } = req.params; 
  const datos = req.body; 

  try {
    const user = await User.findOne({
      where: {nombreUsuario: username},
    });
      if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    Object.keys(datos).forEach((dato) => {
      if (user[dato] !== undefined) {
        user[dato] = datos[dato]; 
      }
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del usuario', error });
  }
};

const eliminarUsuario = async (req, res) => {
  const { username } = req.params;
  
  try{
    const user = await User.findOne({
      where: {nombreUsuario: username},
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    await user.destroy();
  }
  catch(error){
    res.status(500).json({ message: 'Error al eliminar el usuario', error});
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserByUsername,
  actualizarDatosUser,
  eliminarUsuario
};
