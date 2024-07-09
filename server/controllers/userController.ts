import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { tokenData, userData } from "../types";

class UserController {
	userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	// Работа со списком пользователей
	getAllUsers = async (req: Request, res: Response) => {
		try {
			const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : -1;
  		const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : -1;
			const filterField = typeof req.query.filterField === 'string' ? String(req.query.filterField) : "";
			const filterValue = typeof req.query.filterValue === 'string' ? String(req.query.filterValue) : "";
			const sortField = typeof req.query.sortField === 'string' ? String(req.query.sortField) : "";
			const sort = typeof req.query.sort === 'string' ? String(req.query.sort) : "";
			let selectFields = typeof req.query.selectFields === 'string' ? [String(req.query.selectFields)] : req.query.selectFields;
			if (!Array.isArray(selectFields)) {
				selectFields = ['*']
			} else {
				selectFields = selectFields.map(field => String(field))
			}
			const users = await this.userService.getAllUsers(page, limit, filterField, filterValue, sortField, sort, selectFields);
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};
	
	createUser = async (req: Request, res: Response) => {
		try {
			const userData = req.body;
			if (!userData["full_name"] || !userData.email || !userData.password) {
				res.status(400).json({error: 'Incomplete data'});
				return;
			}
			const possibleUser = await this.userService.getUserByField("email", userData.email);
			if (possibleUser.length) {
				res.status(409).json({error: 'User already exists'})
				return;
			}
			const receivedData = await this.userService.createUser(userData);
			res.cookie('refreshToken', receivedData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			res.status(201).json({ message: 'User registered', ...receivedData });
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	// Работа с одним пользователем
	getUserById = async (req: Request, res: Response) => {
		try {
			const user = await this.userService.getUserByField("id", req.params.userId);
			if (!!user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	updateUser = async (req: Request, res: Response) => {
		try {
			const user = await this.userService.updateUser(req.params.userId, req.body);
			if (!!user) {
				res.status(201).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const user = await this.userService.deleteUser(req.params.userId);
			if (!!user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	checkUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userData = req.body;
			const receivedData = await this.userService.checkUser(userData);
			if (!(receivedData)) {
				res.status(401).json({error: 'User data is incorrect'});
				return;
			}
			res.cookie('refreshToken', receivedData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			next(res.status(200).json({ message: 'Authenticated', ...receivedData }));
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};
	
	activateUser = async (req: Request, res: Response) => {
		try {
			const activationLink = req.params.link;
			await this.userService.activateUser(activationLink);
			return res.redirect("http://localhost:5173");
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	refreshToken = async (req: Request, res: Response) => {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				return res.status(404).json({error: "No token"});
			}
			const userData = await this.userService.refreshToken(refreshToken);
			if (!userData) {
				return res.status(401).json({error: "Failed to validate token"});
			}
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	logout = async (req: Request, res: Response) => {
		try {
			const {refreshToken} = req.cookies;
			const token = await this.userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};
};

export default UserController;

export type { UserController };