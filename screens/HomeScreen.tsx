import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { View, Text } from 'react-native';
import baseStyles from "../styles/Base";

export default function HomeScreen(props: { route: any; navigation: any; }) {
	const [articles, setArticles] = useState<ArticleTypes[]>([]);

	useEffect(() => {
		fetch('https://api.dailyscoop.africa/article')
			.then(async (res) => {
				const articles: ArticleTypes[] = await res.json();
				setArticles(articles);
			});
	});

	return (
		<Layout>
			<View>
				<Text style={baseStyles.headingText}>All articles</Text>
			</View>
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