import { StatusBar } from "expo-status-bar";
import {useCallback, useEffect, useState} from "react";
import { Link } from "@react-navigation/native";
import { abbreviateNumber, capitalize, slugifyText } from "../util/helper";
import Layout from "../components/Layout";
import { View, ActivityIndicator, ListRenderItemInfo, FlatList } from "react-native";
import { TopicTypes } from "../types/topic";
import TopicStyles  from "../styles/Topic";

export default function (props: { country: string | null}) {
	const [topics, setTopics] = useState<TopicTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTopics([]);
		getTopics();
	}, [props.country]);

	const renderItem = useCallback((topic: ListRenderItemInfo<TopicTypes>) => (
			<View style={{marginBottom: 25, flex: 1}}>
				<Link style={TopicStyles.topicView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.item.name), topicTitle: topic.item.name }}}>{capitalize(topic.item.name)}</Link>
				<Link style={TopicStyles.countView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.item.name), topicTitle: topic.item.name }}}>{abbreviateNumber(topic.item.articleCount)} Scoops</Link>
			</View>
		),
		[topics]
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
				<View>
					{ loading ?
						<View style={{flex: 1, alignItems: 'center'}}>
							<ActivityIndicator size="small" color="#fdc006"/>
						</View> :
						<FlatList
							style={{marginTop: -30, marginBottom: -50, paddingTop: 30, paddingBottom: 100, paddingLeft: 10, paddingRight: 10}}
							data={topics}
							keyExtractor={topic => slugifyText(topic.name)}
							removeClippedSubviews={true}
							showsVerticalScrollIndicator={false}
							renderItem={renderItem}
						/>
					}
				</View>
			}

			<StatusBar style="auto" />
		</Layout>
	);
}