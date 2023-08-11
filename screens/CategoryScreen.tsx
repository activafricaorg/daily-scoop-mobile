import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { CategoryArticlesTypes } from "../types/category";
import { View, Text } from 'react-native';
import baseStyles from "../styles/Base";

export default function CategoryScreen(props: { category: string, route: any; navigation: any; }) {
	const [count] = useState<number>(24);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getCategoryArticles(false);
	}, []);

	const getCategoryArticles = (keep_existing = true) => {
		try {
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			fetch(`https://api.dailyscoop.africa/category/${props.category}/?page=${loadPage}`)
				.then(async res => {
					const category: CategoryArticlesTypes = await res.json();
					if (category.articles) {
						setArticles(keep_existing ? articles.concat(category.articles) : category.articles);
						setLoading(false);
					}
				});
		} catch (e) {
			console.error(e);
		}
	}

	const fetchMoreArticles = () => {
		setLoading(!loading);

		setTimeout(async () => {
			await getCategoryArticles();
		}, 1500);
	};

	return (
		<Layout>
			<View style={baseStyles.wrapper}>
				{
					articles
						.map((article: ArticleTypes, index: number) => (
							<Article isCategory={ false } key={ index } data={ article } />
						))
				}
				{
					articles.length >= count ?
						<View style={{
							alignSelf: 'center',
							borderTopRightRadius: 20,
							borderTopLeftRadius: 20,
							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20,
							marginTop: 20,
							overflow: 'hidden'}}
						>
							<Text
								style={baseStyles.button}
								onPress={fetchMoreArticles}
							>
								{ loading ? "Loading..." : "Load More" }
							</Text>
						</View>
						:
						null
				}
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}