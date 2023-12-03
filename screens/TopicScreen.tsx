import Layout from "../components/Layout";
import Article from "../components/Article";
import {useState, useEffect, useCallback} from "react";
import { StatusBar } from "expo-status-bar";
import { slugifyText } from "../util/helper";
import { ArticleTypes } from "../types/article";
import {View, Text, ActivityIndicator, ListRenderItemInfo, FlatList} from 'react-native';
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

	const renderItem = useCallback((article: ListRenderItemInfo<ArticleTypes>) =>
			<Article isCategory={ false } data={ article } />,
		[articles]
	)

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
					<FlatList
						style={{marginTop: -30, marginBottom: -50, paddingTop: 30, paddingBottom: 100}}
						data={articles}
						renderItem={renderItem}
						keyExtractor={article => article.url}
						showsVerticalScrollIndicator={false}
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