import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { slugifyText } from "../util/helper";
import { ArticleTypes } from "../types/article";
import { View, Text, ActivityIndicator } from 'react-native';
import Article from "../components/Article";
import baseStyles from "../styles/Base";

export default function HomeScreen(props: { country: string | null, route: any; navigation: any; }) {
	const [count] = useState<number>(16);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getArticles(false);
	}, [props.country]);

	const getArticles = (keep_existing = true) => {
		try {
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			let url = props.country ?
				`https://api.dailyscoop.africa/article/?count=${count}&page=${loadPage}&country=${slugifyText(props.country.toLowerCase())}` :
				`https://api.dailyscoop.africa/article/?count=${count}&page=${loadPage}`
			fetch(url)
				.then(async res => {
					const moreArticles: ArticleTypes[] = await res.json();
					if (moreArticles) {
						setArticles(keep_existing ? articles.concat(moreArticles) : moreArticles);
						setInitialLoading(false);
						setLoading(false);
					}
				});
		} catch (err) {

		}
	}

	const fetchMoreArticles = () => {
		setLoading(!loading);
		setTimeout(async () => {
			await getArticles();
		}, 1500);
	};

	return (
		<Layout>
			{
				initialLoading ?
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