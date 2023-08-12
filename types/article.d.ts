export type ArticleTypes = {
	title: string,
	url: string,
	image: string | undefined,
	source: string,
	guid: string,
	description: string | undefined,
	related?: ArticleTypes[],
	category: string,
	country: string | null,
	articleDate: string | undefined,
	tags: string[],
	createdAt?: string | undefined,
	updatedAt?: string | undefined
}