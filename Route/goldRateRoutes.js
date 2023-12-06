// Route

import express from 'express';
import calculateGoldValue from '../Controllers/goldRateController.js'
import GoldRate from '../Models/goldRateModel.js';
const router = express.Router();

router.post('/calculate', async (req, res) => {
    try {
        const { weight, purity, actualGoldPrice, gstRate, wastageCost, makingCharges } = req.body;

        // Call the controller function
        const calculatedRate = await calculateGoldValue(weight, purity, actualGoldPrice, gstRate, wastageCost, makingCharges);
        // console.log(calculatedRate);
        // Respond with the calculated rate
        res.status(200).json({ message: "Received Data", calculatedRate: { value: calculatedRate } });
    } catch (error) {
        // console.error('Error calculating gold value:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    GoldRate.find({}, {})
        .then((gold) => {
            res.json(gold)
        })
})
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the entry by ID and remove it
        const deleteData = await GoldRate.deleteOne({ _id: id });

        if (!deleteData) {
            return res.status(404).json({ error: 'GoldRate not found' });
        }

        // Respond with the deleted entry
        res.status(200).json({ "message": deleteData });
    } catch (error) {
        console.error('Error deleting GoldRate:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export const goldRateRouter = router;