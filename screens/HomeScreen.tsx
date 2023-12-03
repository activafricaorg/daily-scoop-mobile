import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { slugifyText } from "../util/helper";
import { ArticleTypes } from "../types/article";
import { View, Text, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
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

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(async () => {
			await getArticles();
			setRefreshing(false);
		}, 2000);
	}, []);

	const renderItem = useCallback((article: ListRenderItemInfo<ArticleTypes>) =>
		<Article isCategory={ false } data={ article } />,
		[articles]
	)

	return (
		<Layout>
			{ initialLoading ?
				<View style={{flex: 1, alignItems: 'center'}}>
					<ActivityIndicator size="small" color="#fdc006"/>
				</View> :
				<View style={baseStyles.wrapper}>
					<FlatList
						style={{marginTop: -30, marginBottom: -50, paddingTop: 30, paddingBottom: 100}}
						data={articles}
						renderItem={renderItem}
						keyExtractor={article => article.url}
						showsVerticalScrollIndicator={false}
						removeClippedSubviews={true}
						refreshing={refreshing}
						onRefresh={onRefresh}
						ListHeaderComponent={
							refreshing ?
								<View style={{flex: 1, alignItems: 'center', marginTop: 0, marginBottom: 30}}>
									<ActivityIndicator size="small" color="#fdc006"/>
								</View>
								:
								null
						}
						ListFooterComponent={
							loading ?
								<View style={{flex: 1, alignItems: 'center', marginTop: 20, marginBottom: 60}}>
									<ActivityIndicator size="small" color="#fdc006"/>
								</View>
								:
								articles.length >= count ?
									<View style={{
										alignSelf: 'center',
										borderTopRightRadius: 20,
										borderTopLeftRadius: 20,
										borderBottomLeftRadius: 20,
										borderBottomRightRadius: 20,
										marginTop: 20,
										marginBottom: 60,
										overflow: 'hidden'
									}}>
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
					/>
				</View>
			}
			<StatusBar style="auto" />
		</Layout>
	);
}