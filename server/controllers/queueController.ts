import { Request, Response } from "express";
import { UserService } from "../services/userService";
import QueueService from "../services/queueService";

class QueueController {
	queueService: QueueService;

	constructor(queueService: QueueService) {
		this.queueService = queueService;
	}

	getAllQueue = async (req: Request, res: Response) => {
		try {
			const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : -1;
  		const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : -1;
			const filterField = typeof req.query.filterField === 'string' ? String(req.query.filterField) : "";
			const filterValue = typeof req.query.filterValue === 'string' ? String(req.query.filterValue) : "";
			const sortField = typeof req.query.sortField === 'string' ? String(req.query.sortField) : "";
			const sort = typeof req.query.sort === 'string' ? String(req.query.sort) : "";
			const queue = await this.queueService.getAllQueue(page, limit, filterField, filterValue, sortField, sort);
			res.status(200).json(queue);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};
	
	createQueueRow = async (req: Request, res: Response) => {
		try {
			const queueRowData = req.body;
			if (!queueRowData["queue_date"] || !queueRowData["queue_time"]) {
				res.status(400).json({error: 'Неполные данные'});
				return;
			}
			const newQueue = await this.queueService.createQueueRow(req.body);
			res.status(201).json(newQueue);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	// Работа с одним пользователем
	getQueueRowById = async (req: Request, res: Response) => {
		try {
			const queueRow = await this.queueService.getQueueRowById(req.params.queueId);
			if (!!queueRow) {
				res.status(200).json(queueRow);
			} else {
				res.status(404).json({error: 'Queue Row not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	updateQueueRow = async (req: Request, res: Response) => {
		try {
			const queueRow = await this.queueService.updateQueueRow(req.params.queueId, req.body);
			if (!!queueRow) {
				res.status(201).json(queueRow);
			} else {
				res.status(404).json({error: 'Queue Row not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	deleteQueueRow = async (req: Request, res: Response) => {
		try {
			const queueRow = await this.queueService.deleteQueueRow(req.params.queueId);
			if (!!queueRow) {
				res.status(200).json(queueRow);
			} else {
				res.status(404).json({error: 'Queue Row not found'})
			}
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};

	getQueueByDate = async (req: Request, res: Response) => {
		try {
			const queue = await this.queueService.getQueueByDate(req.params.date);
			res.status(200).json(queue);
		} catch (error) {
			res.status(500).json({error: (error as Error).message});
		}
	};
};

export default QueueController;

export type { QueueController };