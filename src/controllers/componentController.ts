import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import Tracking from '../models/Tracking';

export const trackComponent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { component, variant, action } = req.body;

        if (!component || !action) {
            res.status(400).json({ message: 'Faltan campos requeridos: component y action' });
            return;
        }

        const trackingEntry = new Tracking({
            component,
            variant,
            action,
            timestamp: new Date(),
            // userId: req.user?.id // si estás autenticado
        });

        await trackingEntry.save();

        res.status(201).json({ message: 'Interacción registrada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la interacción' });
    }
};

export const getStats = async (_req: Request, res: Response): Promise<void> => {
    try {
        const stats = await Tracking.aggregate([
            {
                $group: {
                    _id: { component: "$component", variant: "$variant" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const formatted = stats.map(item => ({
            component: item._id.component,
            variant: item._id.variant || "default",
            count: item.count
        }));

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
};

export const exportComponentData = async (_req: Request, res: Response): Promise<void> => {
    try {
        const data = await Tracking.find().lean();

        if (data.length === 0) {
            res.status(404).json({ message: 'No hay datos para exportar' });
            return;
        }

        const fields = ['component', 'variant', 'action', 'timestamp', 'userId'];
        const parser = new Parser({ fields });
        const csv = parser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment('tracking-data.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ message: 'Error al exportar datos', error });
    }
};
