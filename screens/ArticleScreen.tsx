import Layout from "../components/Layout";
import Article from "../components/Article";
import Topic from "../components/Topic";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { capitalize } from "../util/helper";
import * as WebBrowser from "expo-web-browser";
import { ArticleTypes } from "../types/article";
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import baseStyles from "../styles/Base";
import ArticleStyles from "../styles/Article";

export default function ArticleScreen (props: { route: any; navigation: any; }) {
	const [article, setArticle] = useState<ArticleTypes | undefined>(undefined);

	useEffect(() => {
		let guid = props.route.params.guid;
		fetch(`https://api.dailyscoop.africa/article/${guid}/?count=12`)
			.then(async res => {
				const article: ArticleTypes = await res.json();
				if (article) {
					setArticle(article);
				}
			});
	}, []);

	const pushNav = (guid: string) => {
		props.navigation.goBack();
		return props.navigation.push('Article', { guid: guid });
	}

	return (
		<Layout>
			<View style={baseStyles.wrapper}>
				{
					article ?
						<View style={ArticleStyles.single}>
							<View style={ArticleStyles.singleTopics}>
								{
									article.tags && article.tags.length > 0 ?
										<Topic tags={article.tags} />
										:
										null
								}
							</View>
							<View style={ArticleStyles.content}>
								<Text style={ArticleStyles.singleTitle}>
									{ article.title }
								</Text>
								<Text style={ArticleStyles.singleDescription}>
									{ article.description?.split("[…]")[0] }
								</Text>
								<View style={ArticleStyles.readMoreSection}>
									<LinearGradient colors={['hsla(0, 0%, 6%, 0)', '#0f0f0f']} style={{
										position: "absolute",
										alignContent: "flex-end",
										justifyContent: "flex-end",
										display: "flex",
										marginTop: 0,
										marginBottom: 0,
										marginLeft: 15,
										marginRight: 15,
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										margin: 0
									}}>
										<View style={{
											alignSelf: 'center',
											alignContent: 'flex-end',
											borderTopRightRadius: 20,
											borderTopLeftRadius: 20,
											borderBottomLeftRadius: 20,
											borderBottomRightRadius: 20,
											marginBottom: 20,
											overflow: 'hidden'
										}}>
											<Text style={baseStyles.button} onPress={() => WebBrowser.openBrowserAsync(article.url)}>
												Read on {capitalize(article.source)}
											</Text>
										</View>
									</LinearGradient>
								</View>
							</View>
						</View>
						:
						null
				}
			</View>
			<View>
				{
					article && article.related ?
						<>
							<Text>More {`${capitalize(article.category)}`}</Text>
							{
								article.related
									.map((article: ArticleTypes, index: number) => (
										<Article isCategory={ false } key={ index }  data={ article } handleNavigation={pushNav} />
									))
							}
						</>
						:
						null
				}
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}