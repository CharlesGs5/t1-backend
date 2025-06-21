import mongoose, { Schema, Document } from 'mongoose';

export interface ITracking extends Document {
    component: string;
    variant?: string;
    action: string;
    timestamp: Date;
    userId?: string;
}

const TrackingSchema = new Schema<ITracking>({
    component: { type: String, required: true },
    variant: { type: String },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String }
});

export default mongoose.model<ITracking>('Tracking', TrackingSchema);
