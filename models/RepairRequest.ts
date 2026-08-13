import { model, models, Schema } from "mongoose"
const RepairSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, deviceType: String, brand: String, model: String, problem: String, contact: String, image: String, status: { type: String, default: "submitted", index: true }, adminNotes: String, source: { type: String, enum: ["online", "in-shop"], default: "online", index: true } }, { timestamps: true })
export const RepairRequest = models.RepairRequest || model("RepairRequest", RepairSchema)
