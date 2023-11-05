import {Request, Response, NextFunction} from "express";
import {findUserById} from "../../services/user";
import {sendError} from "../../utils/sendError";
import {AuthenticatedRequest} from "../../middlewares/authenticate/authenticate.types";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthenticatedRequest).token.id;

        const user = await findUserById(userId);
        if (!user) {
            res.status(404);
            return sendError('User not found');
        }

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};
