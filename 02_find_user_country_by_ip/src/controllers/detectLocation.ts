import {Request, Response, NextFunction} from 'express';
import {sendError} from "../utils/sendError";
import {findCountryByIp} from "../services/detectLocation";

export const detectLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userIp = req.ip ?? req.socket.remoteAddress;
        if (!userIp) {
            res.send(404);
            return sendError('IP not found');
        }
        const userCountry = findCountryByIp(userIp);

        console.log(`${userCountry.countryName} - ${userIp}`);
        res.send({
            ip: userIp,
            country: userCountry,
        });
    } catch (e) {
        next(e)
    }
};

