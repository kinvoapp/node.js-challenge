import { RequestHandler } from "express";
import { dateFilterTransactions } from "../../services/filters/filterByDateService";

export const filterByDate: RequestHandler = async (req, res) => {
    const user_id = req.userID!
    const initialDate = req.query.initialDate as string
    const endDate = req.query.endDate as string

    await dateFilterTransactions(new Date(initialDate), new Date(endDate), user_id).then((filteredList) => {
        return res.status(200).json(filteredList)
    }).catch((error) => {
        return res.status(error.status).json({ message: error.message })
    })


}