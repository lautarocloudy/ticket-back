const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};


// Login y generación de JWT
const JWT_SECRET = process.env.JWT_SECRET;
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar al usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Generar el JWT
        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' }); // Acceso por 2 horas

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
