import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import {StatusBar} from "expo-status-bar";
import Layout from "../components/Layout";
import * as WebBrowser from "expo-web-browser";
import ArticleStyles from "../styles/Article";

export default function InformationScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={BaseStyles.wrapper}>
				<View style={BaseStyles.infoView}>
					<Text style={BaseStyles.infoViewText} onPress={() => WebBrowser.openBrowserAsync("https://dailyscoop.com/about")}>
						About Daily Scoop
					</Text>
				</View>
				<View style={BaseStyles.infoView}>
					<Text style={BaseStyles.infoViewText} onPress={() => WebBrowser.openBrowserAsync("https://dailyscoop.africa/privacy")}>
						Privacy Policy
					</Text>
				</View>
				<View style={BaseStyles.infoView}>
					<Text style={BaseStyles.infoViewText} onPress={() => WebBrowser.openBrowserAsync("https://dailyscoop.africa/privacy")}>
						Terms
					</Text>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}