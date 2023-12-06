// controller
import GoldRate from "../Models/goldRateModel.js";


const calculateGoldValue = async (weight, purity, actualGoldPrice, gstRate, makingCharges, wastageCost) => {
    try {

        // const gstRate = 0.03;
        // const wastageCost = 0.05;

        // console.log("weight:", weight);
        // console.log("purity:", purity);
        // console.log("actualGoldPrice:", actualGoldPrice);
        // console.log("makingCharges:", makingCharges);
        // console.log("wastageCost:", wastageCost);


        const perGram = actualGoldPrice / 10; // 1 ounce = 31.1035 grams
        // console.log('perGram', perGram);

        const goldRateWithGST = perGram * gstRate;
        // console.log('goldRateWithGST', goldRateWithGST);

        const goldRateWithWastage = perGram * wastageCost;
        const goldMakingCharge = perGram * makingCharges;
        // console.log('goldRateWithWastage', goldRateWithWastage);

        const calculatedRate = weight * perGram + (goldRateWithGST + goldRateWithWastage + goldMakingCharge);
        // console.log('calculatedRate', calculatedRate);

        if (isNaN(weight) || isNaN(wastageCost) || isNaN(makingCharges) || isNaN(actualGoldPrice)) {
            throw new Error("All fields required.");
        }
        if (isNaN(calculatedRate)) {
            throw new Error("Calculated rate is NaN. Handle this case appropriately.");
        }


        // Save the data to MongoDB
        const goldRateData = new GoldRate({
            weight,
            purity,
            actualGoldPrice: actualGoldPrice,
            gstRate,
            pricePerGram: actualGoldPrice,
            wastageCost,
            makingCharges,
            calculatedRate: calculatedRate.toFixed(2),
        });

        await goldRateData.save();

        return calculatedRate.toFixed(2);
    } catch (error) {
        throw error;
    }
};

export default calculateGoldValue;


