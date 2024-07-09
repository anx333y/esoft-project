import { UserController } from "../controllers/userController";
import express, { NextFunction, Request, Response } from "express";

// const checkCookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (req.cookies && req.cookies.refreshToken) {
//     console.log('Cookie found:');
//   } else {
//     console.log('Cookie not found');
//   }
//   next();
// };

export default (userController: UserController) => {
	const router = express.Router();
	router.route('/register')
		.post(userController.createUser);
	router.route('/login')
		.post(userController.checkUser);
	router.route('/activate/:link')
		.get(userController.activateUser);
	router.route('/refresh')
		.get(userController.refreshToken);
	router.route('/logout')
		.post(userController.logout);

	return router;
};