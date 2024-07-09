import { Response, NextFunction } from "express";
import { SECRET_KEY } from "../app";
import { RequestWithUser, userData } from "../types";
const jwt = require("jsonwebtoken");

const authenticateJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ message: 'Authorization header not provided' });
		return;
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		res.status(401).json({ message: 'Token not provided' });
	}

	jwt.verify(token, SECRET_KEY, (err: Error, user: userData) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}
		req.user = user;
		next();
	});
};

export default authenticateJWT;