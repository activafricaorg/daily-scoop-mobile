import { StatusBar } from "expo-status-bar";
import {useCallback, useEffect, useState} from "react";
import { Link } from "@react-navigation/native";
import { abbreviateNumber, capitalize, slugifyText } from "../util/helper";
import Layout from "../components/Layout";
import { View, ActivityIndicator, ListRenderItemInfo, FlatList } from "react-native";
import { TopicTypes } from "../types/topic";
import topicStyles  from "../styles/Topic";
import baseStyles from "../styles/Base";

export default function (props: { country: string | null}) {
	const [topics, setTopics] = useState<TopicTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTopics([]);
		getTopics();
	}, [props.country]);

	const renderItem = useCallback((topic: ListRenderItemInfo<TopicTypes>) => (
			<View style={{marginBottom: 25, flex: 1}}>
				<Link style={topicStyles.topicView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.item.name), topicTitle: topic.item.name }}}>{capitalize(topic.item.name)}</Link>
				<Link style={topicStyles.countView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.item.name), topicTitle: topic.item.name }}}>{abbreviateNumber(topic.item.articleCount)} Scoops</Link>
			</View>
		),
		[]
	)

	const getTopics = () => {
		try {
			let url = props.country ?
				`https://api.dailyscoop.africa/topic/?page=1&count=12&country=${slugifyText(props.country.toLowerCase())}` :
				`https://api.dailyscoop.africa/topic/?page=1&count=12`

			fetch(url)
				.then(async res => {
					const articleTopics: TopicTypes[] = await res.json();
					if (articleTopics) setTopics(articleTopics);
					setLoading(false);
				});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Layout>
			{ loading ?
				<View style={{flex: 1, alignItems: 'center'}}>
					<ActivityIndicator size="small" color="#fdc006"/>
				</View> :
				<View style={baseStyles.infoContainer}>
					{
						topics
							.map ((topic, index: number) => (
								<View key={index} style={{marginBottom: 25}}>
									<Link style={topicStyles.topicView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{capitalize(topic.name)}</Link>
									<Link style={topicStyles.countView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{abbreviateNumber(topic.articleCount)} Scoops</Link>
								</View>
							))
					}
				</View>
			}

			<StatusBar style="auto" />
		</Layout>
	);
}