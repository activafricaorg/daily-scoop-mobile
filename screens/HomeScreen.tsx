import Layout from "../components/Layout";
import Article from "../components/Article";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ArticleTypes } from "../types/article";
import { View, Text, ActivityIndicator } from 'react-native';
import baseStyles from "../styles/Base";
import storage from "../util/storage";
import {slugifyText} from "../util/helper";

export default function HomeScreen(props: { route: any; navigation: any; }) {
	const [count] = useState<number>(24);
	const [articles, setArticles] = useState<ArticleTypes[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [country, setCountry] = useState<string | null>(null);

	useEffect(() => {
		storage.load({key:'countryState', autoSync: false})
			.then((data) => {
				setCountry(data);
			})
			.catch((err) => {
				switch (err.name) {
					case 'NotFoundError':
						setCountry(null);
						break;
					case 'ExpiredError':
						setCountry(null);
						console.warn('expired: ', err.message);
						break;
				}
			});

		setArticles([]);
		getArticles(false);
	}, []);

	const getArticles = (keep_existing = true) => {
		try {
			let loadPage = Math.floor(articles.length / count) + 1;
			if (!keep_existing) loadPage = 1;

			let url = country ?
				`https://api.dailyscoop.africa/article/?page=${loadPage}&country=${slugifyText(country.toLowerCase())}` :
				`https://api.dailyscoop.africa/article/?page=${loadPage}`
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
							null
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