import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import {View} from 'react-native';
import baseStyles from "../styles/Base";
import { IPublisherArticles } from "../types/publisher";
export default function SourceScreen (props: { route: any; navigation: any; }) {
	const [articles, setArticles] = useState<ArticleTypes[]>([]);

	useEffect(() => {
		let slug = props.route.params.source.split("-");
		if (slug.length > 1) slug = slug.join("+");

		fetch(`https://api.dailyscoop.africa/publisher?search=${slug}`)
			.then(async (res) => {
				const publisher: IPublisherArticles[] = await res.json();
				setArticles(publisher[0].articles);
			});
	});

	return (
		<Layout>
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