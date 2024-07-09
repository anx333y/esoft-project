import { Request } from "express";

export type Role = 'admin' | 'user';

export type userData = {
	"id": string;
	"full_name"?: string;
	"email": string;
	"password": string;
	"role"?: Role;
	"is_activated"?: boolean;
	"activation_link"?: string;
};

export type queueData = {
	"queue_date": string;
	"queue_time": string;
	"user_id"?: string;
	"status"?: boolean;
};

export type newsData = {
	"news_author_id": string;
	"news_title": string;
	"content": string;
};

export interface RequestWithUser extends Request {
	user?: userData;
};

export type tokenData = {
	"user_id": string;
	"refresh_token": string;
}