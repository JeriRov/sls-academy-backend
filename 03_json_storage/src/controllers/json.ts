import {Request, Response, NextFunction} from 'express';
import {sendError} from "../utils/sendError";
import {JsonData} from "../services/json";

const jsonStorage = new JsonData();
export const getJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {json_path} = req.params;
        const data = jsonStorage.getData(json_path);

        if (data) {
            res.json({
                success: true,
                data
            });
        } else {
            res.status(404);
            return sendError('Data not found');
        }
    } catch (e) {
        next(e);
    }
}

export const editJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {json_path} = req.params;
        const data = req.body;
        jsonStorage.storeData(json_path, data);
        res.json({
                success: true,
                message: `Data stored at ${json_path}`
            }
        );
    } catch (e) {
        next(e);
    }
};
