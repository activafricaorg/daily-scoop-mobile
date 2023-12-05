import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { slugifyText } from "../util/helper";
import { ArticleTypes } from "../types/article";
import { View, Text, ActivityIndicator } from 'react-native';
import Article from "../components/Article";
import baseStyles from "../styles/Base";

export default function TopicScreen(props: { route: any; navigation: any; }) {
	const [count] = useState<number>(16);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getTopicArticles(false);
	}, []);

	const getTopicArticles = (keep_existing = true) => {
		try {
			let topic = slugifyText(props.route.params.topic);
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			fetch(`https://api.dailyscoop.africa/topic/${topic}/?count=${count}&page=${loadPage}`)
				.then(async res => {
					const topicArticles: ArticleTypes[] = await res.json();
					if (topicArticles) {
						setArticles(keep_existing ? articles.concat(topicArticles) : topicArticles);
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
			await getTopicArticles();
		}, 1500);
	};

	return (
		<Layout>
			{ initialLoading ?
				<View style={{flex: 1, alignItems: 'center'}}>
					<ActivityIndicator size="small" color="#fdc006"/>
				</View> :
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