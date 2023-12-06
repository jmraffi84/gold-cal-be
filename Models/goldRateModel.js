import mongoose from "mongoose";
mongoose.set('strictQuery', false);
// goldRateSchema model schema
const goldRateSchema = new mongoose.Schema({
    weight: { type: Number, required: true },
    purity: { type: Number, required: true },
    actualGoldPrice: { type: Number, required: true },
    gstRate: { type: Number, required: true }, // Set a default value 
    wastageCost: { type: Number, required: true },
    makingCharges: { type: Number, required: true },
    calculatedRate: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

goldRateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const GoldRate = mongoose.model('GoldRate', goldRateSchema);

export default GoldRate;
