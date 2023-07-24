import {ArticleTypes} from "@/types/article";

export type PublisherTypes = {
	name: string,
	url: string,
	feed: string,
	image: string
}

export interface IPublisherArticles extends PublisherTypes {
	articles: ArticleTypes[]
}