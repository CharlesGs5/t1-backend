import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email y contraseña requeridos' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'El usuario ya existe' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            res.status(400).json({ message: 'Email y contraseña requeridos' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password'); // excluye la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

