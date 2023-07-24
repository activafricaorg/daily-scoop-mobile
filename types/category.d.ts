import { PublisherTypes } from "@/types/publisher";
import { ArticleTypes } from "@/types/article";

export type CategoryTypes = {
	name: string,
	slug: string,
	description: string,
	image: string,
	publishers: PublisherTypes[],
}

export type CategoryArticlesTypes = CategoryTypes & {
	articles: ArticleTypes[]
}