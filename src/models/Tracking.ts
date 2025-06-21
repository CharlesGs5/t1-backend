import mongoose, { Schema, Document } from 'mongoose';

export interface ITracking extends Document {
    component: string;
    variant?: string;
    action: string;
    timestamp: Date;
    userId?: string; // opcional, si quieres ligar con usuarios autenticados
}

const TrackingSchema = new Schema<ITracking>({
    component: { type: String, required: true },
    variant: { type: String },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String } // en el futuro puedes asociar esto con req.user.id
});

export default mongoose.model<ITracking>('Tracking', TrackingSchema);
