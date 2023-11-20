import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";
import {abbreviateNumber, capitalize, slugifyText} from "../util/helper";
import Layout from "../components/Layout";
import { View, Text } from "react-native";
import { TopicTypes } from "../types/topic";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import BaseStyles from "../styles/Base";
import TopicStyles  from "../styles/Topic";

const TopicsScreen = (props: { route: any; navigation: any; }) => {
	const [topics, setTopics] = useState<TopicTypes[]>([]);

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
				});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Layout>
			<SafeAreaView>
				<View style={{width: '100%', backgroundColor: '#0f0f0f'}}>
					<View style={BaseStyles.infoContainer}>
						<Text style={BaseStyles.headingText}>
							<Ionicons name='folder-open-outline' size={24} color={'rgb(253, 192, 6)'} /> Topics
						</Text>
						{
							topics
								.map ((topic, index: number) => (
									<View key={index} style={{marginBottom: 25}}>
										<Link style={TopicStyles.topicView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{capitalize(topic.name)}</Link>
										<Link style={TopicStyles.countView} to={{ screen: 'Topic', params: { topic: slugifyText(topic.name), topicTitle: topic.name }}}>{abbreviateNumber(topic.articleCount)} scoops</Link>
									</View>
								))
						}
					</View>
				</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		</Layout>
	);
}

export default TopicsScreen