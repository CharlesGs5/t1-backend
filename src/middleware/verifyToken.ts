import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado o inválido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!); // puedes acceder a req.user.id, etc.
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
