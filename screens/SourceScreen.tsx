import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { IPublisherArticles } from "../types/publisher";
import { Text, View } from 'react-native';
import baseStyles from "../styles/Base";
export default function SourceScreen (props: { route: any; navigation: any; }) {
	const [count] = useState<number>(24);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
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

			fetch(`https://api.dailyscoop.africa/publisher?search=${slug}&page=${loadPage}`)
				.then(async res => {
					const publisher: IPublisherArticles[] = await res.json();
					console.log(publisher);
					if (publisher[0].articles) {
						setArticles(keep_existing ? articles.concat(publisher[0].articles) : publisher[0].articles);
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
			<StatusBar style="auto" />
		</Layout>
	);
}