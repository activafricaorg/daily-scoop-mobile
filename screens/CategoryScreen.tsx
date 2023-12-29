import Layout from "../components/Layout";
import Article from "../components/Article";
import { StatusBar } from "expo-status-bar";
import { slugifyText } from "../util/helper";
import React, { useState, useEffect, useCallback } from "react";
import { ArticleTypes } from "../types/article";
import { CategoryArticlesTypes } from "../types/category";
import { View, Text, ActivityIndicator } from 'react-native';
import baseStyles from "../styles/Base";

export default function CategoryScreen(props: { country: string | null, category: string, route: any; navigation: any; }) {
	console.log(props.route);

	const [count] = useState<number>(16);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getCategoryArticles(false);
	}, [props.country]);

	const getCategoryArticles = (keep_existing = true) => {
		try {
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			let url = props.country ?
				`https://api.dailyscoop.africa/category/${props.category}/?count=${count}&page=${loadPage}&country=${slugifyText(props.country.toLowerCase())}` :
				`https://api.dailyscoop.africa/category/${props.category}/?count=${count}&page=${loadPage}`

			fetch(url)
				.then(async res => {
					const category: CategoryArticlesTypes = await res.json();
					if (category.articles) {
						setArticles(keep_existing ? articles.concat(category.articles) : category.articles);
						setInitialLoading(false);
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
			{ initialLoading ?
				<View style={baseStyles.infoContainer}>
					<View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
						<ActivityIndicator size="small" color="#fdc006"/>
					</View>
				</View>
				:
				<View style={baseStyles.wrapper}>
					{
						articles
							.map((article: ArticleTypes, index: number) => (
								<Article isCategory={ false } key={ index } data={ article } />
							))
					}
					{
						loading ?
							<View style={{flex: 1, alignItems: 'center', marginTop: 20, marginBottom: 20}}>
								<ActivityIndicator size="small" color="#fdc006"/>
							</View>
							:
							articles.length >= count ?
								<View style={baseStyles.buttonWrapper}>
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
			}
			<StatusBar style="auto" />
		</Layout>
	);
}