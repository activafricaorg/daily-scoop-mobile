import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { View, Text, ActivityIndicator } from 'react-native';
import baseStyles from "../styles/Base";

export default function HomeScreen(props: { route: any; navigation: any; }) {
	const [count] = useState<number>(24);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setArticles([]);
		getArticles(false);
	}, []);

	const getArticles = (keep_existing = true) => {
		try {
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			fetch(`https://api.dailyscoop.africa/article/?page=${loadPage}`)
				.then(async res => {
					const moreArticles: ArticleTypes[] = await res.json();
					if (moreArticles) {
						setArticles(keep_existing ? articles.concat(moreArticles) : moreArticles);
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
			await getArticles();
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
						articles.length >= count ?
							<View style={{
								alignSelf: 'center',
								borderTopRightRadius: 20,
								borderTopLeftRadius: 20,
								borderBottomLeftRadius: 20,
								borderBottomRightRadius: 20,
								marginTop: 20,
								marginBottom: 20,
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
			}
			<StatusBar style="auto" />
		</Layout>
	);
}