import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import TopicStyles  from "../styles/Topic";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import { abbreviateNumber } from "../util/helper";

const TopicsScreen = (props: { route: any; navigation: any; }) => {
	const dummyTopics = [
		{
			name: 'nigeria',
			count: 212
		},
		{
			name: 'nwes',
			count: 2300
		},
		{
			name: 'ronaldo',
			count: 6663590
		},
		{
			name: 'messi',
			count: 435590
		}
	]

	return (
		<Layout>
			<SafeAreaView>
				<View style={{width: '100%', backgroundColor: '#0f0f0f'}}>
					<View style={BaseStyles.infoContainer}>
						<Text style={BaseStyles.headingText}>
							<Ionicons name='folder-open-outline' size={26} color={'#a8a8a8'} /> Topics
						</Text>
						{
							dummyTopics
								.map ((topic, index: number) => (
									<View key={index} style={{marginBottom: 25}}>
										<Text style={TopicStyles.topicView}>{topic.name}</Text>
										<Text style={TopicStyles.countView}>{abbreviateNumber(topic.count)} scoops</Text>
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