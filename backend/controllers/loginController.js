const { User } = require('../models');
const jwt = require('jsonwebtoken');

const log = async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }

    try {
        const user = await User.findOne({
            where: {nombreUsuario : usuario},
        })
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }
        let passwordValid = false;
        (password === user.password) ? passwordValid=true:passwordValid; 
        if (!passwordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }
        const token = jwt.sign({ id: User.idUsuario, usuario: User.nombreUsuario }, 'mysecretkey', {
            expiresIn: '1h'
        });
        return res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}
module.exports = {log};