import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { capitalize } from "../util/helper";
import { ArticleTypes } from "../types/article";
import { CategoryArticlesTypes } from "../types/category";
import { View, Text } from 'react-native';
import baseStyles from "../styles/Base";

export default function CategoryScreen(props: { category: string, route: any; navigation: any; }) {
	const [articles, setArticles] = useState<ArticleTypes[]>([]);

	useEffect(() => {
		fetch(`https://api.dailyscoop.africa/category/${props.category}`)
			.then(async (res) => {
				const category: CategoryArticlesTypes = await res.json();
				setArticles(category.articles);
			});
	});

	return (
		<Layout>
			<View style={baseStyles.wrapper}>
				{
					articles
						.map((article: ArticleTypes, index: number) => (
							<Article isCategory={ false } key={ index } data={ article } />
						))
				}
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}