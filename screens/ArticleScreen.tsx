import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { capitalize } from "../util/helper";
import * as WebBrowser from "expo-web-browser";
import { ArticleTypes } from "../types/article";
import { Text, View } from 'react-native';
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
								<Text>Hi</Text>
							</View>
							<View style={ArticleStyles.content}>
								<Text style={ArticleStyles.singleTitle} onPress={() => WebBrowser.openBrowserAsync(article.url)}>
									{ article.title }
								</Text>
								<Text style={ArticleStyles.singleDescription}>
									{ article.description?.split("[…]")[0] }
								</Text>
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