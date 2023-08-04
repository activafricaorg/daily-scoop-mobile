import * as WebBrowser from "expo-web-browser";
import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";

export default function InformationScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={{ width: '100%', backgroundColor: '#0f0f0f', paddingLeft: 15, paddingRight: 15 }}>
				<View style={BaseStyles.infoContainer}>
					<Text style={BaseStyles.headingText} onPress={() => WebBrowser.openBrowserAsync("https://dailyscoop.com/about")}>
						About Daily Scoop
					</Text>
					<Text style={BaseStyles.paragraphText}>
						Daily Scoop is a product of <Text style={BaseStyles.textLink} onPress={() => WebBrowser.openBrowserAsync("https://activ.africa")}>Activ Africa</Text>, a technology company focused on providing user-friendly solutions to everyday problems.
					</Text>
					<Text style={BaseStyles.paragraphText}>
						Daily scoop provides a convenient and efficient way for users to access a wide range of news content, stay informed and manage their information consumption. It gathers information from various reliable sources and presents them in a convenient centralized location for everyone. This reduces the time and effort users would otherwise have spent visiting multiple websites to get their daily news fix.
					</Text>
					<Text style={BaseStyles.paragraphText}>
						About our privacy policy, <Text style={BaseStyles.textLink} onPress={() => WebBrowser.openBrowserAsync("https://activ.africa")}>check here.</Text>
					</Text>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}