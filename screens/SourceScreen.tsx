import Layout from "../components/Layout";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { IPublisherArticles } from "../types/publisher";
import { ActivityIndicator, FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import Article from "../components/Article";
import baseStyles from "../styles/Base";
export default function SourceScreen (props: { route: any; navigation: any; }) {
	const [count] = useState<number>(16);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getSourceArticles(false);
	}, []);

	const getSourceArticles = (keep_existing = true) => {
		try {
			let slug = props.route.params.source.split("-");
			if (slug.length > 1) slug = slug.join("+");

			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			fetch(`https://api.dailyscoop.africa/publisher?search=${slug}&count=${count}&page=${loadPage}`)
				.then(async res => {
					const publisher: IPublisherArticles[] = await res.json();
					if (publisher[0].articles) {
						setArticles(keep_existing ? articles.concat(publisher[0].articles) : publisher[0].articles);
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
			await getSourceArticles();
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