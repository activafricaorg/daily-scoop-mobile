import * as WebBrowser from "expo-web-browser";
import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import ArticleStyles from "../styles/Article";

export default function InformationScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
				<View style={BaseStyles.infoWrapper}>
					<View style={BaseStyles.infoItem}>
						<View style={BaseStyles.infoHeading}>
							<Text style={BaseStyles.infoHeader}>
								🤷🏼‍ About Daily Scoop Africa
							</Text>
						</View>
					</View>
					<View>
						<Text style={BaseStyles.infoContent}>
							Daily Scoop is a product of Activ Africa, a technology company focused on providing user-friendly solutions to everyday problems in Africa.
						</Text>
						<Text style={BaseStyles.infoContent}>
							This platform provides a convenient and efficient way for users to access a wide range of African news content, stay informed and manage their information consumption. It gathers information from various reliable sources and presents them in a convenient centralized location for everyone. This reduces the time and effort users would otherwise have spent visiting multiple websites to get their daily news fix.
						</Text>
					</View>
				</View>
				<View style={BaseStyles.infoWrapper}>
					<View style={BaseStyles.infoItem}>
						<View style={BaseStyles.infoHeading}>
							<Text style={BaseStyles.infoHeader}>
								🚀 Mission & Value Proposition
							</Text>
						</View>
					</View>
					<View>
						<Text style={BaseStyles.infoContent}>
							We believe that there are no small problems and we are motivated by the idea of making improvements to things and processes, even if it's just a small improvement.
						</Text>
						<Text style={BaseStyles.infoContent}>
							Our mission and value propositions are:
						</Text>
						<Text style={BaseStyles.infoContent}>1. Provide convenient access to a wide range of news content and useful information</Text>
						<Text style={BaseStyles.infoContent}>2. Create a centralized platform for news consumption</Text>
						<Text style={BaseStyles.infoContent}>3. Provide real-time updates on breaking news and jobs across Africa</Text>
					</View>
				</View>
				<View style={BaseStyles.infoWrapper}>
					<View style={BaseStyles.infoItem}>
						<View style={BaseStyles.infoHeading}>
							<Text style={BaseStyles.infoHeader}>
								👷🏽 We are building in public
							</Text>
						</View>
					</View>
					<View>
						<Text style={BaseStyles.infoContent}>
							Our users are at the forefront of our innovation and what we build. After all, we started this platform after listening to many of our users. You can track what we are cooking <Text style={BaseStyles.textLink} onPress={() => WebBrowser.openBrowserAsync("https://trello.com/b/ZRbdnLkz/daily-scoop-roadmap")}>here</Text> and also recommend new features to us on our social media.
						</Text>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}