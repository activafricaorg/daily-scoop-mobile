import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";
import { abbreviateNumber, capitalize, slugifyText } from "../util/helper";
import Layout from "../components/Layout";
import {View, ActivityIndicator} from "react-native";
import { TopicTypes } from "../types/topic";
import BaseStyles from "../styles/Base";
import TopicStyles  from "../styles/Topic";

const TopicsScreen = (props: { route: any; navigation: any; }) => {
	const [topics, setTopics] = useState<TopicTypes[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTopics([]);
		getTopics();
	}, []);

	const getTopics = () => {
		try {
			fetch(`https://api.dailyscoop.africa/topic/?page=1&count=12`)
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
			<View style={{width: '100%', backgroundColor: '#0f0f0f'}}>
				<View style={BaseStyles.infoContainer}>
					{ loading ?
						<View style={{flex: 1, alignItems: 'center'}}>
							<ActivityIndicator size="small" color="#fdc006"/>
						</View> :
						<>
							{
								topics
									.map ((topic, index: number) => (
										<View key={index} style={{marginBottom: 25}}>
											<Link style={TopicStyles.topicView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{capitalize(topic.name)}</Link>
											<Link style={TopicStyles.countView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{abbreviateNumber(topic.articleCount)} scoops</Link>
										</View>
									))
							}
						</>
					}
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}

export default TopicsScreen