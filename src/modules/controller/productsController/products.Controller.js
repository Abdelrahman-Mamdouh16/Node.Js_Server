import topOfferModel from "../../../../DB/models/productModel/topOffers.Model.js";
import topSpecialtiesModel from './../../../../DB/models/productModel/topSpecialties.Model.js';

export const topOffers = async (req, res) => {

    try {
        const topOffer = await topOfferModel.find()
        if (topOffer) {
            return res.json({ success: true, message: 'topOffer found successfully', result: topOffer })
        } else {
            return res.json({ success: false, message: 'topOffer not found' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `top offers error : ${error}` })
    }
}
export const topSpecialties = async (req, res) => {

    try {
        const topSpecialties = await topSpecialtiesModel.find()
        if (topSpecialties) {
            return res.json({ success: true, message: 'topSpecialties found successfully', result: topSpecialties })
        } else {
            return res.json({ success: false, message: 'topSpecialties not found' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `topSpecialties error : ${error}` })
    }
}