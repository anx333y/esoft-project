import NewsModel from "../models/newsModel";
import { newsData } from "../types";

class NewsService {
	newsModel: NewsModel;

	constructor(newsModel: NewsModel) {
		this.newsModel = newsModel;
	}

	async getAllNews() {
		return this.newsModel.getAll();
	};
	
	async createNews(newsData: newsData) {
		return this.newsModel.create(newsData);
	};


	async getNewsById(id: string) {
		return this.newsModel.getById(id);
	};

	async updateNews(id: string, newsData: newsData) {
		return this.newsModel.update(id, newsData);
	};

	async deleteNews(id: string) {
		return this.newsModel.delete(id);
	};
};

export default NewsService;